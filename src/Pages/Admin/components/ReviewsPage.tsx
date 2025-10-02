import { Star, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Review } from '../data/mockData';
import ReviewModal from './ReviewModal';

interface ReviewsPageProps {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  searchTerm: string;
}

export default function ReviewsPage({ reviews, setReviews, searchTerm }: ReviewsPageProps) {
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    mode: 'view' | 'edit';
    review?: Review;
  }>({ isOpen: false, mode: 'view' });

  const filteredReviews = reviews.filter(review =>
    review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewReview = (review: Review) => {
    setReviewModal({ isOpen: true, mode: 'view', review });
  };

  const handleEditReview = (review: Review) => {
    setReviewModal({ isOpen: true, mode: 'edit', review });
  };

  const handleQuickApprove = (reviewId: number) => {
    setReviews(reviews.map(r => 
      r.id === reviewId ? { ...r, status: 'approved' as const } : r
    ));
  };

  const handleQuickReject = (reviewId: number) => {
    setReviews(reviews.map(r => 
      r.id === reviewId ? { ...r, status: 'rejected' as const } : r
    ));
  };

  const handleSaveReview = (reviewId: number, status: 'approved' | 'rejected') => {
    setReviews(reviews.map(r => 
      r.id === reviewId ? { ...r, status } : r
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAvatarColor = (initials: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <>
      <div className="flex flex-col gap-4">
      {filteredReviews.map((review) => (
        <div 
          key={review.id} 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer"
          onClick={() => handleViewReview(review)}
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getAvatarColor(review.userInitials)} text-white font-semibold`}>
              {review.userInitials}
            </div>
            
            {/* Review Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{review.productName}</span>
                </div>
                <span className="text-sm text-gray-400">{new Date(review.date).toLocaleDateString('ru-RU')}</span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-600">({review.rating}/5)</span>
              </div>
              
              {/* Comment */}
              <p className="text-gray-700 mb-4">{review.comment}</p>
              
              {/* Status and Actions */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  review.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {review.status === 'pending' ? 'Ожидает модерации' :
                   review.status === 'approved' ? 'Одобрен' : 'Отклонен'}
                </span>
                
                {review.status === 'pending' && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickApprove(review.id);
                      }}
                      className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-all text-sm"
                    >
                      <Check className="w-3 h-3" />
                      Одобрить
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickReject(review.id);
                      }}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all text-sm"
                    >
                      <X className="w-3 h-3" />
                      Отклонить
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditReview(review);
                      }}
                      className="flex items-center gap-1 bg-lime-500 text-white px-3 py-1 rounded-lg hover:bg-lime-600 transition-all text-sm"
                    >
                      Модерировать
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>

      <ReviewModal
        isOpen={reviewModal.isOpen}
        onClose={() => setReviewModal({ isOpen: false, mode: 'view' })}
        review={reviewModal.review}
        mode={reviewModal.mode}
        onSave={handleSaveReview}
      />
    </>
  );
}