import { useState, useEffect } from 'react';
import { User } from '../data/mockData';
import Modal from './Modal';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  mode: 'view' | 'add' | 'edit';
  onSave: (user: Omit<User, 'id'>) => void;
}

export default function UserModal({ isOpen, onClose, user, mode, onSave }: UserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ordersCount: 0,
    status: 'active' as 'active' | 'blocked'
  });

  useEffect(() => {
    if (user && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: user.name,
        email: user.email,
        ordersCount: user.ordersCount,
        status: user.status
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        email: '',
        ordersCount: 0,
        status: 'active'
      });
    }
  }, [user, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode !== 'view') {
      onSave(formData);
      onClose();
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'add': return 'Добавить пользователя';
      case 'edit': return 'Редактировать пользователя';
      case 'view': return 'Просмотр пользователя';
      default: return '';
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()}>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all"
              required
              readOnly={isReadOnly}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all"
              required
              readOnly={isReadOnly}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Количество заказов
            </label>
            <input
              type="number"
              value={formData.ordersCount}
              onChange={(e) => setFormData({ ...formData, ordersCount: parseInt(e.target.value) || 0 })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all"
              min="0"
              readOnly={isReadOnly}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Статус
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'blocked' })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all"
              disabled={isReadOnly}
            >
              <option value="active">Активен</option>
              <option value="blocked">Заблокирован</option>
            </select>
          </div>
        </div>

        {!isReadOnly && (
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-all"
            >
              {mode === 'add' ? 'Добавить' : 'Сохранить'}
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
}