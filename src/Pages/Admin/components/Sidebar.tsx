import { Users, Package, MessageSquare, Menu, X } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'users', name: 'Пользователи', icon: Users },
  { id: 'products', name: 'Продукты', icon: Package },
  { id: 'reviews', name: 'Отзывы', icon: MessageSquare }
];

export default function Sidebar({ currentPage, setCurrentPage, isCollapsed, setIsCollapsed }: SidebarProps) {
  return (
    <div className={`bg-white shadow-lg flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🍿</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">SnackShop</h1>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-lime-50 transition-all"
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5 text-gray-600" />
          ) : (
            <X className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-lime-100 text-lime-700 border-l-4 border-lime-500' 
                    : 'text-gray-600 hover:bg-lime-50 hover:text-lime-600'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}