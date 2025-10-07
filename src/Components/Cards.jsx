import React, { useEffect, useState } from 'react';
import { ShoppingCart, Plus, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { motion } from 'framer-motion';

const MOBILE_BREAKPOINT = 1024;

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;
        const mql = window.matchMedia(mediaQuery);

        setIsMobile(mql.matches);

        const handler = (e) => setIsMobile(e.matches);
        mql.addListener(handler);

        return () => mql.removeListener(handler);
    }, []);

    return isMobile;
};


const menuItems = [
    'Все',
    'Летнее меню',
    'Кофе и чай',
    'Холодные напитки',
    'Комбо',
    'Shoko Go',
    'Завтраки весь день',
    'Блинчики',
    'Пицца от Eazzy Pizza & Gelato',
    'Кондитерское',
];

const Sidebar = ({ isOpen, onClose, activeItem, onItemClick }) => {
    const handleItemClick = (item) => {
        onItemClick(item);

        if (window.innerWidth < 1024) {
            onClose();
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed lg:sticky top-0 lg:top-6 left-0 h-full lg:h-[calc(100vh-4rem)] w-80 lg:w-full z-50 lg:z-0 transform transition-transform duration-300 lg:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="bg-white rounded-none lg:rounded-3xl p-4 lg:p-6 shadow-lg lg:shadow-sm overflow-y-auto" style={{ maxHeight: '100%' }}>
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

                    <h3 className="hidden lg:block font-serif text-xl mb-6 text-gray-800">Меню</h3>

                    <div className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleItemClick(item)}
                                className={`w-full text-left p-3 rounded-xl transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 ${activeItem === item
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

const ProductCard = ({ product, onOpen, index }) => {
    const isMobile = useIsMobile();
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


    const hoverMotionProps = isMobile
        ? {}
        : {
            scale: 1.03,
            y: -5,
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
        };


    const fadeInVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: i => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: isMobile ? 0 : i * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 20
            },
        }),
    };


    return (
        <motion.div
            className="relative bg-gradient-to-br from-gray-20 to-white rounded-xl p-3 sm:p-4 lg:p-5 shadow-sm transition-shadow group overflow-visible cursor-pointer"
            onClick={handleCardClick}


            whileHover={hoverMotionProps}

            whileTap={{ scale: isMobile ? 0.98 : 0.995 }}


            initial="hidden"
            animate="visible"
            custom={index}
            variants={fadeInVariants}
        >
            {product.isNew && (
                <div className="absolute left-3 sm:left-4 lg:left-6 -top-2 sm:-top-3 z-10">
                    <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg font-medium">
                        NEW
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl lg:rounded-2xl shadow-inner relative">

                <div className="h-32 sm:h-36 lg:h-44 flex items-center justify-center -mt-1 sm:-mt-2 mb-3 sm:mb-4 relative">

                    <div className="bg-white p-2 sm:p-3 rounded-xl lg:rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                        <img
                            src={product.img}
                            alt={product.title}
                            className="max-h-24 sm:max-h-28 lg:max-h-36 w-24 sm:w-28 lg:w-36 object-cover rounded-lg lg:rounded-xl"
                            onError={e => { e.currentTarget.src = './cake.png'; }}
                        />
                    </div>
                </div>

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

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isMobile || (qty > 0) ? { opacity: 1, y: 0 } : {}}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-4 transition-all duration-300 ${!isMobile && (qty === 0) ? 'group-hover:opacity-100 group-hover:translate-y-0 opacity-0 translate-y-2' : ''}`}
            >
                <button
                    onClick={handleAdd}
                    className="bg-[#A16341] hover:bg-[#8B5232] active:bg-[#8B5232] text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-200 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 touch-manipulation active:scale-95 ml-17 mb-0"
                >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Корзина</span>
                    <span className="sm:hidden">+</span>
                </button>
            </motion.div>


            {qty > 0 && (
                <div className="absolute -top-2 -right-2 bg-[#A16341] text-white text-xs w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-medium shadow-lg">
                    {qty}
                </div>
            )}
        </motion.div>
    );
};

const CatalogDesign = () => {
    const [selected, setSelected] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [product, setProduct] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Все');

    const getProduct = async () => {
        try {
            const res = await axios.get("https://68da7ca423ebc87faa304c96.mockapi.io/product");
            setProduct(res.data);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);


    const filteredProducts = activeCategory === 'Все'
        ? product
        : product.filter(p => p.category === activeCategory);

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

    const handleCategoryChange = (category) => {
        setActiveCategory(category);

    };


    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-screen-2xl mx-auto">
                <div className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#A16341]/30"
                            aria-label="Открыть меню"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg font-serif text-gray-800">{activeCategory}</h2>
                        <div className="text-sm text-gray-500">{filteredProducts.length}</div>
                    </div>
                </div>

                <div className="flex lg:grid lg:grid-cols-12 lg:gap-6 xl:gap-8 p-4 sm:p-6">
                    <div className="lg:col-span-3 position-sticky">
                        <Sidebar
                            isOpen={sidebarOpen}
                            onClose={closeSidebar}
                            activeItem={activeCategory}
                            onItemClick={handleCategoryChange}
                        />
                    </div>


                    <div className="flex-1 lg:col-span-9">
                        <div className="hidden lg:flex items-center justify-between mb-6">
                            <h2 className="text-xl xl:text-2xl font-serif text-gray-800">{activeCategory}</h2>
                            <div className="text-sm text-gray-500">{filteredProducts.length} товаров</div>
                        </div>


                        {product.length > 0 ? (
                            <motion.div
                                key={activeCategory}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8"
                            >
                                {filteredProducts.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onOpen={openDetails}
                                        index={index}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="text-6xl mb-4">
                                    <HashLoader
                                        color="#BF6519"
                                        size={400}
                                        speedMultiplier={0.9}
                                    />
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ProductModal product={selected} open={modalOpen} onClose={closeDetails} />
        </div>
    );
};

export default CatalogDesign;