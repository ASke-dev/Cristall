import { useState, useEffect } from 'react';
import { Product } from '../data/mockData';
import Modal from './Modal';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  mode: 'view' | 'add' | 'edit';
  onSave: (product: Omit<Product, 'id'>) => void;
}

const categories = ['Чипсы', 'Орехи', 'Сухарики', 'Попкорн', 'Семечки', 'Снеки'];
const emojis = ['🍟', '🥜', '🍞', '🍿', '🌻', '🦐', '🌽', '🟫', '🥨', '🧀'];

export default function ProductModal({ isOpen, onClose, product, mode, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Чипсы',
    price: 0,
    stock: 0,
    emoji: '🍟'
  });

  useEffect(() => {
    if (product && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        stock: product.stock,
        emoji: product.emoji
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        category: 'Чипсы',
        price: 0,
        stock: 0,
        emoji: '🍟'
      });
    }
  }, [product, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode !== 'view') {
      onSave(formData);
      onClose();
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'add': return 'Добавить продукт';
      case 'edit': return 'Редактировать продукт';
      case 'view': return 'Просмотр продукта';
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
              Эмодзи
            </label>
            <div className="flex flex-wrap gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => !isReadOnly && setFormData({ ...formData, emoji })}
                  className={`w-12 h-12 text-2xl rounded-lg border-2 transition-all ${
                    formData.emoji === emoji 
                      ? 'border-lime-500 bg-lime-50' 
                      : 'border-gray-200 hover:border-lime-300'
                  }`}
                  disabled={isReadOnly}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название
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
              Категория
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all"
              disabled={isReadOnly}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цена (сом)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all"
                min="0"
                required
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                На складе
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-all"
                min="0"
                required
                readOnly={isReadOnly}
              />
            </div>
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