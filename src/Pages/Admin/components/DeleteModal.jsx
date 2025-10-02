import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';



export default function DeleteModal({ isOpen, onClose, onConfirm, title, message, itemName }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <p className="text-gray-700">{message}</p>
            {itemName && (
              <p className="font-semibold text-gray-900 mt-1">"{itemName}"</p>
            )}
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
          <p className="text-sm text-red-800">
            <strong>Внимание:</strong> Это действие нельзя отменить.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            Отмена
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Удалить
          </button>
        </div>
      </div>
    </Modal>
  );
}