import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Review } from '../data/mockData';
import Modal from './Modal';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review?: Review;
  mode: 'view' | 'edit';
  onSave: (reviewId: number, status: 'approved' | 'rejected') => void;
}

export default function ReviewModal({ isOpen, onClose, review, mode, onSave }: ReviewModalProps) {
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    if (review) {
      setStatus(review.status);
    }
  }, [review]);

  const handleSave = () => {
    if (review && mode === 'edit' && status !== 'pending') {
      onSave(review.id, status as 'approved' | 'rejected');
      onClose();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
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

  const getTitle = () => {
    return mode === 'edit' ? 'Модерация отзыва' : 'Просмотр отзыва';
  };

  if (!review) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()} size="lg">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-6">
          {/* Avatar */}
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getAvatarColor(review.userInitials)} text-white font-semibold text-lg`}>
            {review.userInitials}
          </div>
          
          {/* Review Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg text-gray-900">{review.userName}</h4>
              <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('ru-RU')}</span>
            </div>
            
            <p className="text-gray-600 mb-3">{review.productName}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-gray-600">({review.rating}/5)</span>
            </div>
          </div>
        </div>
        
        {/* Comment */}
        <div className="mb-6">
          <h5 className="font-medium text-gray-900 mb-2">Комментарий:</h5>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">{review.comment}</p>
          </div>
        </div>
        
        {/* Status */}
        <div className="mb-6">
          <h5 className="font-medium text-gray-900 mb-3">Статус:</h5>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="pending"
                checked={status === 'pending'}
                onChange={(e) => setStatus(e.target.value as any)}
                className="text-lime-500 focus:ring-lime-500"
                disabled={mode === 'view'}
              />
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Ожидает модерации
              </span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="approved"
                checked={status === 'approved'}
                onChange={(e) => setStatus(e.target.value as any)}
                className="text-lime-500 focus:ring-lime-500"
                disabled={mode === 'view'}
              />
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Одобрен
              </span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                value="rejected"
                checked={status === 'rejected'}
                onChange={(e) => setStatus(e.target.value as any)}
                className="text-lime-500 focus:ring-lime-500"
                disabled={mode === 'view'}
              />
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Отклонен
              </span>
            </label>
          </div>
        </div>

        {mode === 'edit' && (
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-all"
              disabled={status === 'pending'}
            >
              Сохранить
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}