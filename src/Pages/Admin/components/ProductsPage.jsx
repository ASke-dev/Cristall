import { Plus, Eye, CreditCard as Edit2, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductModal from './ProductModal';
import DeleteModal from './DeleteModal';
// import img from "../../../../"

const API_URL = 'https://68da7ca423ebc87faa304c96.mockapi.io/product';

export default function ProductsPage({ products, setProducts, searchTerm }) {
  const [productModal, setProductModal] = useState({
    isOpen: false,
    mode: 'add',
    product: null
  });
  
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    product: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET запрос для загрузки продуктов при монтировании компонента
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL);
        const data = response.data || [];
        setProducts(data);
        console.log('Продукты загружены:', data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message || 'Ошибка загрузки продуктов');
        } else {
          setError('Неизвестная ошибка');
        }
        console.error('Ошибка при загрузке продуктов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Загружаем один раз при монтировании

  const filteredProducts = products.filter(product =>
    product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product?.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setProductModal({ isOpen: true, mode: 'add', product: null });
  };

  const handleViewProduct = (product) => {
    setProductModal({ isOpen: true, mode: 'view', product });
  };

  const handleEditProduct = (product) => {
    setProductModal({ isOpen: true, mode: 'edit', product });
  };

  const handleDeleteProduct = (product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const handleSaveProduct = (productData) => {
    if (productModal.mode === 'add') {
      const newProduct = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1
      };
      setProducts([...products, newProduct]);
    } else if (productModal.mode === 'edit' && productModal.product) {
      setProducts(products.map(p => 
        p.id === productModal.product.id 
          ? { ...productData, id: productModal.product.id }
          : p
      ));
    }
  };

  const handleConfirmDelete = () => {
    if (deleteModal.product) {
      setProducts(products.filter(p => p.id !== deleteModal.product.id));
    }
  };

  // Показываем состояние загрузки
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Загрузка продуктов...</p>
        </div>
      </div>
    );
  }

  // Показываем ошибку
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold mb-2">Ошибка загрузки</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Add Product Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleAddProduct}
            className="flex items-center gap-2 bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Добавить продукт
          </button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Продукты не найдены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
                {/* Product Emoji */}
                <div className="text-center mb-4 ">
                  {
                    product.images?.slice(0, 1).map((el, i)=>(
                      <img src={`${el}`} alt="" key={i} className='rounded-2xl'/>
                    ))
                  }
                </div>
                
                {/* Product Info */}
                <div className="flex flex-col gap-3 mb-4">
                  <h3 className="font-semibold text-lg text-gray-900">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-lime-600">{product.price} сом</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleViewProduct(product)}
                    className="p-2 rounded-lg hover:bg-blue-100 transition-all"
                    title="Просмотр"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                  </button>
                  <button 
                    onClick={() => handleEditProduct(product)}
                    className="p-2 rounded-lg hover:bg-yellow-100 transition-all"
                    title="Редактировать"
                  >
                    <Edit2 className="w-4 h-4 text-yellow-600" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product)}
                    className="p-2 rounded-lg hover:bg-red-100 transition-all"
                    title="Удалить"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProductModal
        isOpen={productModal.isOpen}
        onClose={() => setProductModal({ isOpen: false, mode: 'add', product: null })}
        product={productModal.product}
        mode={productModal.mode}
        onSave={handleSaveProduct}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, product: null })}
        onConfirm={handleConfirmDelete}
        title="Удалить продукт"
        message="Вы уверены, что хотите удалить этот продукт?"
        itemName={deleteModal.product?.title}
      />
    </>
  );
}