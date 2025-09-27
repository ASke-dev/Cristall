import { useState, useEffect } from 'react';
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import { BsCart3 } from "react-icons/bs";
import { NavLink } from 'react-router';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    // Блокируем скролл когда открыто мобильное меню
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    // Закрываем мобильное меню по Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        
        if (mobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [mobileMenuOpen]);

    const CartButton = () => {
        const { totalCount, openCart } = useCart();
        
        return (
            <button 
                onClick={openCart} 
                className="relative bg-white border border-gray-200 px-2 sm:px-3 py-2 rounded-full flex items-center gap-1 sm:gap-2 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A16341]/30"
                aria-label={`Корзина (${totalCount} товаров)`}
            >
                <BsCart3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-[#A16341] transition-colors duration-200" />
                <span className="hidden sm:inline text-sm text-gray-700 group-hover:text-[#A16341] transition-colors duration-200">
                    Корзина
                </span>
                {totalCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#A16341] text-white text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-medium animate-pulse">
                        {totalCount > 99 ? '99+' : totalCount}
                    </span>
                )}
            </button>
        );
    };

    const UserButton = () => {
        return (
            <button className="group hidden sm:flex items-center border border-gray-300 rounded-full p-2 px-3 space-x-2 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A16341]/30">
                <FiUser className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 group-hover:text-[#A16341] transition-colors duration-200" />
                <span className="text-gray-700 group-hover:text-[#A16341] transition-colors duration-200 text-xs sm:text-sm font-medium">
                    Личный кабинет
                </span>
            </button>
        );
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const navigationItems = [
        { href: '/', label: 'Каталог', isPrimary: true },
        { href: '/opto', label: 'Оптовые продажи' },
        { href: '#', label: 'Продажи в розницу' },
        { href: '#', label: 'О компании' },
        { href: '#', label: 'Контакты' }
    ];

    return (
        <>
            <header className={`sticky top-0 z-40 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
                    : 'bg-white shadow-md'
            }`}>
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <img 
                                src="/logo.svg" 
                                alt="Логотип" 
                                className="h-7 sm:h-8 lg:h-10 transition-transform duration-200 hover:scale-105" 
                            />
                            <div className="hidden md:block">
                        
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
                            {navigationItems.slice(0, 3).map((item, index) => (
                                <NavLink
                                    key={item.label}
                                    to={item.href}
                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 ${
                                        item.isPrimary
                                            ? 'bg-[#A16341] text-white shadow-md hover:bg-[#8B5232] hover:scale-105 active:scale-95'
                                            : 'text-gray-700 hover:text-[#A16341] hover:bg-gray-50'
                                    }`}
                                    style={{ 
                                        animationDelay: `${index * 100}ms`,
                                        animation: 'fadeInUp 0.6s ease-out forwards'
                                    }}
                                >
                                    {item.isPrimary && (
                                        <img src="/s.svg" alt="" className="inline-block w-4 h-4 mr-2" />
                                    )}
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Right side buttons */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <UserButton />
                            <CartButton />
                            
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden p-2 rounded-md border border-gray-200 hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A16341]/30"
                                aria-label="Открыть меню"
                            >
                                <FiMenu className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 transition-opacity duration-300 animate-fadeIn"
                        onClick={closeMobileMenu}
                    />
                    
                    {/* Menu Panel */}
                    <div className="absolute top-0 left-0 right-0 bg-white shadow-2xl animate-slideDown">
                        {/* Menu Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <img src="/logo.svg" alt="Логотип" className="h-8" />
                                <div>
                                    <div className="text-sm font-medium text-gray-800">Меню</div>
                                    <div className="text-xs text-gray-500">Доставка и самовывоз</div>
                                </div>
                            </div>
                            <button
                                onClick={closeMobileMenu}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#A16341]/30"
                                aria-label="Закрыть меню"
                            >
                                <FiX className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>

                        {/* Menu Content */}
                        <div className="p-4 space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
                            {/* User Account Button - mobile */}
                            <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 ">
                                <FiUser className="h-5 w-5 text-gray-700" />
                                <span className="text-gray-700 font-medium">Личный кабинет</span>
                            </button>

                            {/* Navigation Links */}
                            {navigationItems.map((item, index) => (
                                <NavLink
                                    key={item.label}
                                    to={item.href}
                                    onClick={closeMobileMenu}
                                    className={`block w-full p-3 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 animate-slideInLeft ${
                                        item.isPrimary
                                            ? 'bg-[#A16341] text-white shadow-md hover:bg-[#8B5232]'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-[#A16341]'
                                    }`}
                                    style={{ 
                                        animationDelay: `${(index + 1) * 100}ms`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    {item.isPrimary && (
                                        <img src="/s.svg" alt="" className="inline-block w-4 h-4 mr-2" />
                                    )}
                                    {item.label}
                                </NavLink>
                            ))}

                            {/* Additional mobile links */}
                            <div className="pt-2 border-t border-gray-100">
                                <a href="#" className="block w-full p-3 text-gray-600 hover:text-[#A16341] hover:bg-gray-50 rounded-xl transition-all duration-200 animate-slideInLeft" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
                                    О компании
                                </a>
                                <a href="#" className="block w-full p-3 text-gray-600 hover:text-[#A16341] hover:bg-gray-50 rounded-xl transition-all duration-200 animate-slideInLeft" style={{ animationDelay: '700ms', animationFillMode: 'both' }}>
                                    Вакансии
                                </a>
                                <a href="#" className="block w-full p-3 text-gray-600 hover:text-[#A16341] hover:bg-gray-50 rounded-xl transition-all duration-200 animate-slideInLeft" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
                                    Отзывы
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <CartDrawer />

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideDown {
                    from { 
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to { 
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes slideInLeft {
                    from {
                        transform: translateX(-20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes fadeInUp {
                    from {
                        transform: translateY(10px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-slideDown {
                    animation: slideDown 0.4s ease-out;
                }

                .animate-slideInLeft {
                    animation: slideInLeft 0.5s ease-out;
                    opacity: 0;
                }
            `}</style>
        </>
    );
};

export default Header;