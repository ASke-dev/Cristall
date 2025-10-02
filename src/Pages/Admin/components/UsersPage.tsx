import { Plus, Eye, CreditCard as Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { User } from '../data/mockData';
import UserModal from './UserModal';
import DeleteModal from './DeleteModal';

interface UsersPageProps {
  users: User[];
  setUsers: (users: User[]) => void;
  searchTerm: string;
}

export default function UsersPage({ users, setUsers, searchTerm }: UsersPageProps) {
  const [userModal, setUserModal] = useState<{
    isOpen: boolean;
    mode: 'view' | 'add' | 'edit';
    user?: User;
  }>({ isOpen: false, mode: 'add' });
  
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    user?: User;
  }>({ isOpen: false });

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setUserModal({ isOpen: true, mode: 'add' });
  };

  const handleViewUser = (user: User) => {
    setUserModal({ isOpen: true, mode: 'view', user });
  };

  const handleEditUser = (user: User) => {
    setUserModal({ isOpen: true, mode: 'edit', user });
  };

  const handleDeleteUser = (user: User) => {
    setDeleteModal({ isOpen: true, user });
  };

  const handleSaveUser = (userData: Omit<User, 'id'>) => {
    if (userModal.mode === 'add') {
      const newUser: User = {
        ...userData,
        id: Math.max(...users.map(u => u.id)) + 1
      };
      setUsers([...users, newUser]);
    } else if (userModal.mode === 'edit' && userModal.user) {
      setUsers(users.map(u => 
        u.id === userModal.user!.id 
          ? { ...userData, id: userModal.user!.id }
          : u
      ));
    }
  };

  const handleConfirmDelete = () => {
    if (deleteModal.user) {
      setUsers(users.filter(u => u.id !== deleteModal.user!.id));
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
      {/* Add User Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleAddUser}
          className="flex items-center gap-2 bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          Добавить пользователя
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">ID</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Имя</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Email</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Заказы</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Статус</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-lime-50 transition-all">
                  <td className="py-4 px-6 text-gray-900 font-medium">#{user.id}</td>
                  <td className="py-4 px-6 text-gray-900">{user.name}</td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                  <td className="py-4 px-6 text-gray-900 font-medium">{user.ordersCount}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewUser(user)}
                        className="p-2 rounded-lg hover:bg-blue-100 transition-all"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-2 rounded-lg hover:bg-yellow-100 transition-all"
                      >
                        <Edit2 className="w-4 h-4 text-yellow-600" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className="p-2 rounded-lg hover:bg-red-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      <UserModal
        isOpen={userModal.isOpen}
        onClose={() => setUserModal({ isOpen: false, mode: 'add' })}
        user={userModal.user}
        mode={userModal.mode}
        onSave={handleSaveUser}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false })}
        onConfirm={handleConfirmDelete}
        title="Удалить пользователя"
        message="Вы уверены, что хотите удалить этого пользователя?"
        itemName={deleteModal.user?.name}
      />
    </>
  );
}