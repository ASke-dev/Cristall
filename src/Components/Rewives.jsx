import React, { useState, useEffect } from 'react';
import { Star, StarOff, Edit3, MessageSquare, TrendingUp, Users, Loader2, Send, ThumbsUp, ThumbsDown, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../SupaBase/supabase';
import { motion, AnimatePresence } from 'framer-motion';

const StarRating = ({ rating, interactive = false, onRatingChange = null }) => {
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const filled = index < rating;
    return (
      <button
        key={index}
        type="button"
        onClick={() => interactive && onRatingChange && onRatingChange(index + 1)}
        className={`transition-all duration-200 ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
        aria-label={`Рейтинг ${index + 1}`}
      >
        {filled ? (
          <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-500 text-amber-500" />
        ) : (
          <StarOff className="w-5 h-5 sm:w-6 sm:h-6 text-stone-300" />
        )}
      </button>
    );
  });

  return <div className="flex gap-1">{stars}</div>;
};

async function getCurrentUser() {
  try {
    if (supabase?.auth && typeof supabase.auth.getUser === 'function') {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.warn('supabase.auth.getUser error:', error);
        return null;
      }
      return data?.user ?? null;
    }
    return null;
  } catch (err) {
    console.error('getCurrentUser unexpected error:', err);
    return null;
  }
}

const GeneralReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [showReplies, setShowReplies] = useState({});

  useEffect(() => {
    fetchCurrentUser();
    fetchReviews();
  }, []);

  const fetchCurrentUser = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select(`
          id,
          user_id,
          rating,
          comment,
          created_at,
          profiles (
            username,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError);
        setReviews([]);
        setLoading(false);
        return;
      }

      if (!reviewsData || reviewsData.length === 0) {
        setReviews([]);
        setLoading(false);
        return;
      }

      const reviewIds = reviewsData.map(r => r.id);
      const { data: reactionsData, error: reactionsError } = await supabase
        .from('review_reactions')
        .select('review_id, user_id, reaction_type')
        .in('review_id', reviewIds);

      if (reactionsError) {
        console.error('Error fetching reactions:', reactionsError);
      }

      const { data: repliesData, error: repliesError } = await supabase
        .from('review_replies')
        .select(`
          id,
          review_id,
          user_id,
          reply_text,
          created_at,
          profiles (
            username,
            full_name,
            avatar_url
          )
        `)
        .in('review_id', reviewIds)
        .order('created_at', { ascending: true });

      if (repliesError) {
        console.error('Error fetching replies:', repliesError);
      }

      const reactionsByReview = {};
      reactionsData?.forEach(reaction => {
        if (!reactionsByReview[reaction.review_id]) {
          reactionsByReview[reaction.review_id] = { likes: 0, dislikes: 0, userReaction: null };
        }
        if (reaction.reaction_type === 'like') {
          reactionsByReview[reaction.review_id].likes++;
        } else {
          reactionsByReview[reaction.review_id].dislikes++;
        }
        if (reaction.user_id === currentUser?.id) {
          reactionsByReview[reaction.review_id].userReaction = reaction.reaction_type;
        }
      });

      const repliesByReview = {};
      repliesData?.forEach(reply => {
        if (!repliesByReview[reply.review_id]) {
          repliesByReview[reply.review_id] = [];
        }
        repliesByReview[reply.review_id].push(reply);
      });

      const enrichedReviews = reviewsData?.map(review => ({
        ...review,
        reactions: reactionsByReview[review.id] || { likes: 0, dislikes: 0, userReaction: null },
        replies: repliesByReview[review.id] || []
      })) || [];

      setReviews(enrichedReviews);
    } catch (err) {
      console.error('Unexpected error:', err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const user = await getCurrentUser();
      if (!user) {
        alert('Пожалуйста, войдите, чтобы оставить отзыв.');
        setIsSubmitting(false);
        return;
      }

      const reviewData = {
        user_id: user.id,
        rating,
        comment: comment.trim(),
      };

      const { error: insertError } = await supabase
        .from('reviews')
        .insert(reviewData)
        .select();

      if (insertError) {
        console.error('Insert error:', insertError);
        alert('Ошибка при отправке отзыва');
        setIsSubmitting(false);
        return;
      }

      setComment('');
      setRating(5);
      await fetchReviews();
      alert('Отзыв успешно отправлен!');
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Произошла ошибка при отправке');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReaction = async (reviewId, reactionType) => {
    if (!currentUser) {
      alert('Войдите, чтобы оценить отзыв');
      return;
    }

    const review = reviews.find(r => r.id === reviewId);
    const currentReaction = review?.reactions?.userReaction;

    try {
      if (currentReaction === reactionType) {
        await supabase
          .from('review_reactions')
          .delete()
          .eq('review_id', reviewId)
          .eq('user_id', currentUser.id);
      } else {
        await supabase
          .from('review_reactions')
          .upsert({
            review_id: reviewId,
            user_id: currentUser.id,
            reaction_type: reactionType
          });
      }

      await fetchReviews();
    } catch (err) {
      console.error('Reaction error:', err);
    }
  };

  const handleReplySubmit = async (reviewId) => {
    if (!currentUser) {
      alert('Войдите, чтобы ответить');
      return;
    }

    if (!replyText.trim()) return;

    try {
      await supabase
        .from('review_replies')
        .insert({
          review_id: reviewId,
          user_id: currentUser.id,
          reply_text: replyText.trim()
        });

      setReplyText('');
      setReplyingTo(null);
      await fetchReviews();
    } catch (err) {
      console.error('Reply error:', err);
    }
  };

  const toggleReplies = (reviewId) => {
    setShowReplies(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 py-6 sm:py-12 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-800 to-amber-600 bg-clip-text text-transparent mb-4">
            Отзывы наших клиентов
          </h1>

          <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6 flex-wrap">
            <div className="bg-white/80 px-4 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg border border-amber-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                <div className="text-3xl sm:text-4xl font-bold text-amber-700">{averageRating}</div>
              </div>
              <div className="text-xs sm:text-sm text-stone-600">Средняя оценка</div>
            </div>

            <div className="bg-white/80 px-4 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg border border-amber-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                <div className="text-3xl sm:text-4xl font-bold text-amber-700">{reviews.length}</div>
              </div>
              <div className="text-xs sm:text-sm text-stone-600">Всего отзывов</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white/90 rounded-2xl sm:rounded-3xl shadow-2xl border border-amber-200 p-4 sm:p-6 md:p-8 mb-8 sm:mb-12"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center flex-shrink-0">
              <Edit3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-stone-800">Поделитесь впечатлениями</h2>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-lg font-semibold text-stone-700 mb-3">Ваша оценка</label>
              <StarRating rating={rating} interactive={true} onRatingChange={setRating} />
            </div>

            <div>
              <label className="block text-sm sm:text-lg font-semibold text-stone-700 mb-3">Ваш отзыв</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                placeholder="Расскажите о своём опыте..."
                className="w-full p-3 sm:p-4 border-2 border-amber-200 rounded-xl sm:rounded-2xl focus:border-amber-500 focus:outline-none focus:ring-0 transition-all duration-300 resize-none text-stone-700 placeholder-stone-400 text-sm sm:text-base bg-white shadow-sm hover:shadow-md"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !comment.trim()}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 hover:from-amber-700 hover:to-amber-800 hover:shadow-xl hover:scale-105 disabled:from-stone-400 disabled:to-stone-500 disabled:cursor-not-allowed disabled:scale-100 text-sm sm:text-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> Отправка...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" /> Опубликовать отзыв
                </>
              )}
            </button>
          </div>
        </motion.div>

        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 sm:py-20">
              <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-amber-600 animate-spin mb-4" />
              <p className="text-stone-500 text-base sm:text-lg">Загружаем отзывы...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-lg border border-amber-200">
              <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-amber-600 mx-auto mb-4" />
              <p className="text-lg sm:text-xl text-stone-600 font-medium">Отзывов пока нет</p>
              <p className="text-stone-500 mt-2 text-sm sm:text-base">Станьте первым, кто поделится мнением!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6">
              {reviews.map((review) => {
                const profile = review.profiles;
                const username = profile?.full_name || profile?.username || 'Анонимный пользователь';
                const avatarUrl = profile?.avatar_url;
                const initial = username[0]?.toUpperCase() || 'А';
                const reviewDate = review.created_at
                  ? new Date(review.created_at).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                  : '';

                const reactions = review.reactions || { likes: 0, dislikes: 0, userReaction: null };
                const replies = review.replies || [];

                return (
                  <motion.div
                    key={review.id}
                    className="bg-white/90 rounded-xl sm:rounded-2xl shadow-lg border border-amber-100 p-4 sm:p-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={username}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-lg border-2 border-amber-200"
                          />
                        ) : (
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg flex-shrink-0">
                            {initial}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2 flex-col sm:flex-row gap-1 sm:gap-2">
                          <h3 className="font-bold text-base sm:text-xl text-stone-800 break-words">
                            {username}
                            {profile?.username && profile.username !== username && (
                              <span className="text-stone-400 text-xs sm:text-sm ml-2 font-normal">
                                @{profile.username}
                              </span>
                            )}
                          </h3>
                          <span className="text-xs sm:text-sm text-stone-500 bg-stone-100 px-2 sm:px-3 py-1 rounded-full flex-shrink-0">
                            {reviewDate}
                          </span>
                        </div>

                        <div className="mb-3">
                          <StarRating rating={review.rating} />
                        </div>

                        <p className="text-stone-700 leading-relaxed text-sm sm:text-lg mb-4">{review.comment}</p>

                        <div className="flex items-center gap-2 sm:gap-4 mb-3 flex-wrap">
                          <button
                            onClick={() => handleReaction(review.id, 'like')}
                            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all text-xs sm:text-sm font-medium ${reactions.userReaction === 'like'
                                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border-2 border-transparent'
                              }`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                            <span>{reactions.likes}</span>
                          </button>

                          <button
                            onClick={() => handleReaction(review.id, 'dislike')}
                            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg transition-all text-xs sm:text-sm font-medium ${reactions.userReaction === 'dislike'
                                ? 'bg-red-100 text-red-700 border-2 border-red-300'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border-2 border-transparent'
                              }`}
                          >
                            <ThumbsDown className="w-4 h-4" />
                            <span>{reactions.dislikes}</span>
                          </button>

                          <button
                            onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all text-xs sm:text-sm font-medium"
                          >
                            <Reply className="w-4 h-4" />
                            <span>Ответить</span>
                          </button>

                          {replies.length > 0 && (
                            <button
                              onClick={() => toggleReplies(review.id)}
                              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-lg bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all text-xs sm:text-sm font-medium"
                            >
                              {showReplies[review.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              <span>{replies.length} {replies.length === 1 ? 'ответ' : 'ответов'}</span>
                            </button>
                          )}
                        </div>

                        <AnimatePresence>
                          {replyingTo === review.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pl-3 sm:pl-4 border-l-4 border-blue-300"
                            >
                              <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Напишите ответ..."
                                rows={3}
                                className="w-full p-2 sm:p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-0 transition-all resize-none text-stone-700 text-sm sm:text-base bg-white shadow-sm hover:shadow-md"
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleReplySubmit(review.id)}
                                  disabled={!replyText.trim()}
                                  className="px-3 sm:px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-lg hover:bg-blue-700 disabled:bg-stone-400 disabled:cursor-not-allowed transition-all font-medium"
                                >
                                  Отправить
                                </button>
                                <button
                                  onClick={() => {
                                    setReplyingTo(null);
                                    setReplyText('');
                                  }}
                                  className="px-3 sm:px-4 py-2 bg-stone-200 text-stone-700 text-xs sm:text-sm rounded-lg hover:bg-stone-300 transition-all font-medium"
                                >
                                  Отмена
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <AnimatePresence>
                          {showReplies[review.id] && replies.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 space-y-3"
                            >
                              {replies.map((reply) => {
                                const replyProfile = reply.profiles;
                                const replyUsername = replyProfile?.full_name || replyProfile?.username || 'Анонимный';
                                const replyAvatar = replyProfile?.avatar_url;
                                const replyInitial = replyUsername[0]?.toUpperCase() || 'А';
                                const replyDate = reply.created_at
                                  ? new Date(reply.created_at).toLocaleDateString('ru-RU', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })
                                  : '';

                                return (
                                  <div key={reply.id} className="pl-3 sm:pl-4 border-l-4 border-amber-200 py-2">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                      {replyAvatar ? (
                                        <img
                                          src={replyAvatar}
                                          alt={replyUsername}
                                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-amber-200 flex-shrink-0"
                                        />
                                      ) : (
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                                          {replyInitial}
                                        </div>
                                      )}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1 sm:gap-2 mb-1 flex-wrap">
                                          <span className="font-semibold text-stone-800 text-xs sm:text-base break-words">{replyUsername}</span>
                                          <span className="text-xs text-stone-500">{replyDate}</span>
                                        </div>
                                        <p className="text-stone-700 text-xs sm:text-base break-words">{reply.reply_text}</p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralReviewSection;