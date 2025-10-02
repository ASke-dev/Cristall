import { Search } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  stats: {
    users: number;
    products: number;
    reviews: number;
  };
}

const pageNames: Record<string, string> = {
  users: 'Пользователи',
  products: 'Продукты', 
  reviews: 'Отзывы'
};

export default function Header({ currentPage, searchTerm, setSearchTerm, stats }: HeaderProps) {
  return (
    <div className="bg-white shadow-md p-6 border-b border-gray-200">
      <div className="flex items-center justify-between gap-6">
        {/* Page Title */}
        <div className="flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{pageNames[currentPage]}</h2>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="text-center">
            <div className="text-2xl font-bold text-lime-600">{stats.users}</div>
            <div className="text-sm text-gray-500">Пользователи</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-lime-600">{stats.products}</div>
            <div className="text-sm text-gray-500">Продукты</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-lime-600">{stats.reviews}</div>
            <div className="text-sm text-gray-500">Отзывы</div>
          </div>
        </div>
      </div>
    </div>
  );
}