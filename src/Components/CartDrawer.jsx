import { useCart } from '../context/CartContext';
import { BsCart3 } from "react-icons/bs";
import { useEffect, useRef } from 'react';

const CartDrawer = () => {
    const { items, isOpen, closeCart, removeFromCart, updateQty, totalCount } = useCart();

    const total = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);

    // Prevent body scroll when cart is open. Preserve and restore scroll position to avoid layout jump.
    const scrollYRef = useRef(0);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (isOpen) {
            // save current scroll
            scrollYRef.current = window.scrollY || window.pageYOffset || 0;
            // lock body
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            // restore
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            // restore scroll
            window.scrollTo(0, scrollYRef.current || 0);
        }

        return () => {
            // cleanup in case component unmounts while open
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollYRef.current || 0);
        };
    }, [isOpen]);

    // Close cart when clicking outside
    const handleBackdropClick = (e) => {
        // Только если клик именно по backdrop, а не по его детям
        if (e.target === e.currentTarget) {
            closeCart();
        }
    };

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeCart();
            }
        };
        
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, closeCart]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
                onClick={handleBackdropClick}
                aria-hidden={!isOpen}
            >
                {/* Desktop & Tablet: right-side drawer */}
                <div
                    className={`hidden sm:flex fixed top-0 right-0 h-full bg-white z-[60] transform transition-transform duration-300 flex-col translate-x-0 shadow-2xl`}
                    style={{ width: 'min(90vw, 420px)' }}
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-4 md:p-6 bg-[#A16341] text-white flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg md:text-xl font-semibold">Корзина</h2>
                            <button
                                onClick={closeCart}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                                aria-label="Закрыть корзину"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="text-xs md:text-sm text-white/70 mt-1">
                            {totalCount} {totalCount === 1 ? 'товар' : totalCount < 5 ? 'товара' : 'товаров'}
                        </p>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-auto p-4 md:p-6">
                        {items.length === 0 ? (
                            <div className="text-center py-8 md:py-12">
                                <div className="text-3xl md:text-4xl mb-4 text-gray-300">
                                    <BsCart3 className="mx-auto" />
                                </div>
                                <p className="text-gray-500 text-sm md:text-base">Корзина пуста</p>
                            </div>
                        ) : (
                            <div className="space-y-3 md:space-y-4">
                                {items.map(item => (
                                    <div key={item.id} className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1 pr-2">
                                                <h3 className="font-medium text-gray-900 text-sm md:text-base leading-tight">{item.title}</h3>
                                                <p className="text-[#A16341] font-medium text-xs md:text-sm mt-1">{parseFloat(item.price).toLocaleString()}₽ за шт.</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-[#A16341] transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 rounded"
                                                aria-label="Удалить товар"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center bg-[#A16341]/10 rounded-full">
                                                <button
                                                    onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                                                    className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-[#A16341]/20 rounded-l-full transition-colors text-[#A16341] focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 text-sm md:text-base"
                                                    aria-label="Уменьшить количество"
                                                >
                                                    −
                                                </button>
                                                <span className="px-2 md:px-3 font-medium text-[#A16341] min-w-[2rem] text-center text-sm md:text-base">{item.qty}</span>
                                                <button
                                                    onClick={() => updateQty(item.id, item.qty + 1)}
                                                    className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-[#A16341]/20 rounded-r-full transition-colors text-[#A16341] focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 text-sm md:text-base"
                                                    aria-label="Увеличить количество"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="font-semibold text-[#A16341] text-sm md:text-base">
                                                {(parseFloat(item.price) * item.qty).toLocaleString()}₽
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="p-4 md:p-6 bg-[#A16341]/5 flex-shrink-0 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-3 md:mb-4">
                                <span className="text-base md:text-lg text-gray-800">Итого:</span>
                                <span className="text-xl md:text-2xl font-bold text-[#A16341]">{total.toLocaleString()}₽</span>
                            </div>
                            <button className="w-full bg-[#A16341] text-white py-3 rounded-full font-medium hover:bg-[#8B5232] transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 active:scale-98 text-sm md:text-base">
                                Оформить заказ
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile: bottom sheet drawer */}
                <div
                    className={`sm:hidden fixed left-0 right-0 bottom-0 bg-white z-[60] transform transition-transform duration-300 flex flex-col translate-y-0 rounded-t-2xl shadow-2xl`}
                    style={{ 
                        height: window.innerHeight < 700 ? '95vh' : '90vh',
                        maxHeight: '95vh'
                    }}
                    role="dialog"
                    aria-modal="true"
                    tabIndex={-1}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Mobile Header */}
                    <div className="p-4 bg-[#A16341] text-white flex-shrink-0">
                        <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-3" aria-hidden />
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Корзина</h2>
                            <button
                                onClick={closeCart}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                                aria-label="Закрыть корзину"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="text-sm text-white/70 mt-1">
                            {totalCount} {totalCount === 1 ? 'товар' : totalCount < 5 ? 'товара' : 'товаров'}
                        </p>
                    </div>

                    {/* Mobile Items */}
                    <div className="flex-1 overflow-auto p-4" style={{ minHeight: 0 }}>
                        {items.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-4 text-gray-300">
                                    <BsCart3 className="mx-auto" />
                                </div>
                                <p className="text-gray-500">Корзина пуста</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {items.map(item => (
                                    <div key={item.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1 pr-2">
                                                <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">{item.title}</h3>
                                                <p className="text-[#A16341] font-medium text-sm mt-1">{parseFloat(item.price).toLocaleString()}₽ за шт.</p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-[#A16341] transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 rounded flex-shrink-0"
                                                aria-label="Удалить товар"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center bg-[#A16341]/10 rounded-full">
                                                <button
                                                    onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-[#A16341]/20 active:bg-[#A16341]/30 rounded-l-full transition-colors text-[#A16341] focus:outline-none focus:ring-2 focus:ring-[#A16341]/30"
                                                    aria-label="Уменьшить количество"
                                                >
                                                    −
                                                </button>
                                                <span className="px-3 font-medium text-[#A16341] min-w-[2.5rem] text-center">{item.qty}</span>
                                                <button
                                                    onClick={() => updateQty(item.id, item.qty + 1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-[#A16341]/20 active:bg-[#A16341]/30 rounded-r-full transition-colors text-[#A16341] focus:outline-none focus:ring-2 focus:ring-[#A16341]/30"
                                                    aria-label="Увеличить количество"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="font-semibold text-[#A16341] flex-shrink-0 ml-2">
                                                {(parseFloat(item.price) * item.qty).toLocaleString()}₽
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile Footer */}
                    {items.length > 0 && (
                        <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0 safe-area-bottom">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-lg text-gray-800">Итого:</span>
                                <span className="text-xl font-bold text-[#A16341]">{total.toLocaleString()}₽</span>
                            </div>
                            <button className="w-full bg-[#A16341] text-white py-3.5 rounded-full font-medium hover:bg-[#8B5232] shadow-lg hover:shadow-xl active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#A16341]/30 touch-manipulation">
                                Оформить заказ
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartDrawer;