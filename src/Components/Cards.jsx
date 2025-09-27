import React, { useState } from 'react';
import { ShoppingCart, Plus, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

// Данные продуктов с индивидуальными изображениями
const products = [
    {
        id: 1,
        title: 'Медовик',
        description: 'Нежный медовый торт со сметанным кремом',
        price: 350,
        weight: '200 г',
        calories: '520 ккал',
        images: [
            '/products/medovik-main.jpg',
            '/products/medovik-slice.jpg',
            '/products/medovik-detail.jpg'
        ],
        img: '/products/medovik-main.jpg',
        isNew: true
    },
    {
        id: 2,
        title: 'Наполеон',
        description: 'Классический торт с заварным кремом',
        price: 400,
        weight: '220 г',
        calories: '550 ккал',
        images: [
            '/products/napoleon-main.jpg',
            '/products/napoleon-layers.jpg',
            '/products/napoleon-top.jpg'
        ],
        img: '/products/napoleon-main.jpg',
        isNew: true
    },
    {
        id: 3,
        title: 'Тирамису',
        description: 'Итальянский десерт с кофейным ароматом',
        price: 450,
        weight: '180 г',
        calories: '480 ккал',
        images: [
            '/products/tiramisu-classic.jpg',
            '/products/tiramisu-side.jpg',
            '/products/tiramisu-portion.jpg'
        ],
        img: '/products/tiramisu-classic.jpg',
        isNew: false
    },
    {
        id: 4,
        title: 'Чизкейк',
        description: 'Нежный творожный торт с ягодами',
        price: 380,
        weight: '200 г',
        calories: '490 ккал',
        images: [
            '/products/cheesecake-berry.jpg',
            '/products/cheesecake-slice.jpg',
            '/products/cheesecake-whole.jpg'
        ],
        img: '/products/cheesecake-berry.jpg',
        isNew: false
    },
    {
        id: 5,
        title: 'Красный бархат',
        description: 'Яркий торт с кремчизом',
        price: 420,
        weight: '210 г',
        calories: '510 ккал',
        images: [
            '/products/redvelvet-main.jpg',
            '/products/redvelvet-cut.jpg',
            '/products/redvelvet-decoration.jpg'
        ],
        img: '/products/redvelvet-main.jpg',
        isNew: false
    },
    {
        id: 6,
        title: 'Эклеры',
        description: 'Французские пирожные с кремом',
        price: 300,
        weight: '150 г',
        calories: '450 ккал',
        images: [
            '/products/eclairs-set.jpg',
            '/products/eclairs-single.jpg',
            '/products/eclairs-cream.jpg'
        ],
        img: '/products/eclairs-set.jpg',
        isNew: false
    },
    {
        id: 7,
        title: 'Макарон',
        description: 'Французские миндальные пирожные',
        price: 280,
        weight: '100 г',
        calories: '380 ккал',
        images: [
            '/products/macaron-colorful.jpg',
            '/products/macaron-stack.jpg',
            '/products/macaron-close.jpg'
        ],
        img: '/products/macaron-colorful.jpg',
        isNew: false
    },
    {
        id: 8,
        title: 'Профитроли',
        description: 'Воздушные пирожные с заварным кремом',
        price: 320,
        weight: '180 г',
        calories: '420 ккал',
        images: [
            '/products/profiteroles-tower.jpg',
            '/products/profiteroles-plate.jpg',
            '/products/profiteroles-cream.jpg'
        ],
        img: '/products/profiteroles-tower.jpg',
        isNew: false
    },
    {
        id: 9,
        title: 'Штрудель',
        description: 'Австрийский десерт с яблоками',
        price: 260,
        weight: '160 г',
        calories: '340 ккал',
        images: [
            '/products/strudel-apple.jpg',
            '/products/strudel-slice.jpg',
            '/products/strudel-powdered.jpg'
        ],
        img: '/products/strudel-apple.jpg',
        isNew: false
    },
    {
        id: 10,
        title: 'Панна-котта',
        description: 'Итальянский молочный десерт',
        price: 290,
        weight: '120 г',
        calories: '310 ккал',
        images: [
            '/products/pannacotta-berry.jpg',
            '/products/pannacotta-vanilla.jpg',
            '/products/pannacotta-caramel.jpg'
        ],
        img: '/products/pannacotta-berry.jpg',
        isNew: false
    },
    {
        id: 11,
        title: 'Мильфей',
        description: 'Слоеный торт с кремом',
        price: 370,
        weight: '190 г',
        calories: '480 ккал',
        images: [
            '/products/millefeuille-classic.jpg',
            '/products/millefeuille-layers.jpg',
            '/products/millefeuille-top.jpg'
        ],
        img: '/products/millefeuille-classic.jpg',
        isNew: false
    },
    {
        id: 12,
        title: 'Крем-брюле',
        description: 'Французский десерт с карамельной корочкой',
        price: 340,
        weight: '140 г',
        calories: '390 ккал',
        images: [
            '/products/cremebrulee-caramel.jpg',
            '/products/cremebrulee-flame.jpg',
            '/products/cremebrulee-spoon.jpg'
        ],
        img: '/products/cremebrulee-caramel.jpg',
        isNew: false
    }
];

const menuItems = [
    'Летнее меню',
    'Кофе и чай',
    'Холодные напитки',
    'Комбо',
    'Shoko Go',
    'Завтраки весь день',
    'Блинчики',
    'Пицца от Eazzy Pizza & Gelato',
    'Супы'
];

const Sidebar = ({ isOpen, onClose }) => {
    const [activeItem, setActiveItem] = useState('Летнее меню');

    const handleItemClick = (item) => {
        setActiveItem(item);
        // Закрываем меню на мобильных после выбора
        if (window.innerWidth < 1024) {
            onClose();
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}
            
            {/* Sidebar */}
            <aside className={`
                fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 lg:w-full z-50 lg:z-0
                transform transition-transform duration-300 lg:transform-none
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="bg-white rounded-none lg:rounded-3xl p-4 lg:p-6 shadow-lg lg:shadow-sm h-full lg:h-auto overflow-y-auto">
                    {/* Mobile header */}
                    <div className="flex items-center justify-between mb-6 lg:hidden">
                        <h3 className="font-serif text-xl text-gray-800">Меню</h3>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Закрыть меню"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Desktop header */}
                    <h3 className="hidden lg:block font-serif text-xl mb-6 text-gray-800">Меню</h3>

                    <div className="space-y-1">
                        {menuItems.map((item, index) => (
                            <button
                                key={item}
                                onClick={() => handleItemClick(item)}
                                className={`w-full text-left p-3 rounded-xl transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 ${
                                    activeItem === item
                                        ? 'bg-[#A16341] text-white shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
};

const ProductCard = ({ product, onOpen }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart, items, openCart } = useCart();
    const inCart = items.find(i => i.id === product.id);
    const qty = inCart ? inCart.qty : 0;

    const handleAdd = (e) => {
        e.stopPropagation();
        addToCart({ ...product, price: product.price, priceNumber: product.price });
        openCart();
    };

    const handleCardClick = () => {
        if (onOpen) {
            onOpen(product);
        }
    };

    return (
        <div
            className="relative bg-gradient-to-br from-gray-20 to-white rounded-xl p-3 sm:p-4 lg:p-5 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-visible cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            {/* NEW Badge */}
            {product.isNew && (
                <div className="absolute left-3 sm:left-4 lg:left-6 -top-2 sm:-top-3 z-10">
                    <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg font-medium">
                        NEW
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl lg:rounded-2xl shadow-inner relative">
                {/* Product Image */}
                <div className="h-32 sm:h-36 lg:h-44 flex items-center justify-center -mt-1 sm:-mt-2 mb-3 sm:mb-4 relative">
                    <div className={`bg-white p-2 sm:p-3 rounded-xl lg:rounded-2xl shadow-lg transition-all duration-300 ${
                        isHovered ? 'shadow-2xl scale-105' : ''
                    }`}>
                        <img
                            src={product.img}
                            alt={product.title}
                            className="max-h-24 sm:max-h-28 lg:max-h-36 w-24 sm:w-28 lg:w-36 object-cover rounded-lg lg:rounded-xl"
                            onError={e => { e.currentTarget.src = './cake.png'; }}
                        />
                    </div>
                </div>

                {/* Product info */}
                <div className="px-2 sm:px-3 lg:px-0">
                    <div className="text-xs text-gray-400 mb-2 sm:mb-3 flex items-center gap-2">
                        <span>{product.weight}</span>
                        <span>•</span>
                        <span>{product.calories}</span>
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                        <h4 className="text-gray-800 font-serif font-semibold text-sm sm:text-base lg:text-lg line-clamp-2">
                            {product.title}
                        </h4>
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 sm:line-clamp-none">
                            {product.description}
                        </p>
                        <div className="pt-1 sm:pt-2">
                            <span className="text-[#A16341] font-bold text-base sm:text-lg">
                                {product.price}₽
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add to cart button - показываем всегда на мобильных, по hover на десктопе */}
            <div className={`absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 transition-all duration-300 ${
                isHovered || window.innerWidth < 1024 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
                <button 
                    onClick={handleAdd} 
                    className="bg-[#A16341] hover:bg-[#8B5232] active:bg-[#8B5232] text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 touch-manipulation active:scale-95"
                >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Корзина</span>
                    <span className="sm:hidden">+</span>
                </button>
            </div>

            {/* Quantity badge */}
            {qty > 0 && (
                <div className="absolute -top-2 -right-2 bg-[#A16341] text-white text-xs w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-medium shadow-lg">
                    {qty}
                </div>
            )}
        </div>
    );
};

const CatalogDesign = () => {
    const [selected, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openDetails = product => {
        setSelected(product);
        setModalOpen(true);
    };
    
    const closeDetails = () => {
        setModalOpen(false);
        setSelected(null);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-screen-2xl mx-auto">
                {/* Mobile Header */}
                <div className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#A16341]/30"
                            aria-label="Открыть меню"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg font-serif text-gray-800">Каталог</h2>
                        <div className="text-sm text-gray-500">{products.length}</div>
                    </div>
                </div>

                <div className="flex lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8 p-4 sm:p-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-3 position-sticky">
                        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1 lg:col-span-9">
                        {/* Desktop Header */}
                        <div className="hidden lg:flex items-center justify-between mb-6">
                            <h2 className="text-xl xl:text-2xl font-serif text-gray-800">Каталог</h2>
                            <div className="text-sm text-gray-500">{products.length} товаров</div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
                            {products.map(product => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    onOpen={openDetails} 
                                />
                            ))}
                        </div>

                        {/* Load More Button */}
                     \
                    </div>
                </div>
            </div>
            
            <ProductModal product={selected} open={modalOpen} onClose={closeDetails} />
        </div>
    );
};

export default CatalogDesign;