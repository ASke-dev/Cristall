import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UsersPage from '../components/UsersPage';
import ProductsPage from '../components/ProductsPage';
import ReviewsPage from '../components/ReviewsPage';
import { users, products, reviews } from '../data/mockData';

function DashBoard() {
  const [currentPage, setCurrentPage] = useState('users');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [usersData, setUsersData] = useState(users);
  const [productsData, setProductsData] = useState(products);
  const [reviewsData, setReviewsData] = useState(reviews);

  const stats = {
    users: usersData.length,
    products: productsData.length,
    reviews: reviewsData.length
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'users':
        return <UsersPage users={usersData} setUsers={setUsersData} searchTerm={searchTerm} />;
      case 'products':
        return <ProductsPage products={productsData} setProducts={setProductsData} searchTerm={searchTerm} />;
      case 'reviews':
        return <ReviewsPage reviews={reviewsData} setReviews={setReviewsData} searchTerm={searchTerm} />;
      default:
        return <UsersPage users={usersData} setUsers={setUsersData} searchTerm={searchTerm} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          currentPage={currentPage}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          stats={stats}
        />

        {/* Page Content */}
        <div className="flex-1 p-6">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;