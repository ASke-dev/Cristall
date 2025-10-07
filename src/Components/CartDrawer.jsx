import { useCart } from '../context/CartContext';
import { BsCart3 } from "react-icons/bs";
import { useEffect, useRef, useState } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
    const { items, isOpen, closeCart, removeFromCart, updateQty, totalCount, clearCart } = useCart();

    const total = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);
    const totalAmount = total.toFixed(2);

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                description: "Заказ из интернет-магазина",
                amount: {
                    currency_code: "RUB",
                    value: totalAmount,
                    breakdown: { item_total: { currency_code: "RUB", value: totalAmount } },
                },
                items: items.map(item => ({
                    name: item.title,
                    unit_amount: { currency_code: "RUB", value: parseFloat(item.price).toFixed(2) },
                    quantity: item.qty,
                })),
            }],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(details => {
            alert(`Транзакция PayPal завершена. ID заказа: ${details.id}`);
            clearCart();
            closeCart();
        });
    };

    const onError = (err) => {
        console.error("PayPal Ошибка:", err);
        alert("Произошла ошибка при обработке платежа PayPal.");
    };

    const scrollYRef = useRef(0);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (isOpen) {
            scrollYRef.current = window.scrollY || window.pageYOffset || 0;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollYRef.current || 0);
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollYRef.current || 0);
        };
    }, [isOpen]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) closeCart();
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) closeCart();
        };
        if (isOpen) document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeCart]);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const ArrowStyle = "absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer p-3 rounded-full bg-white shadow-lg text-amber-700 hover:bg-amber-100 transition";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-black z-50"
                        onClick={handleBackdropClick}
                        aria-hidden={!isOpen}
                    />

                    {!isMobile && (
                        <motion.div
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 300, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-full bg-white z-[60] flex flex-col shadow-2xl"
                            style={{ width: 'min(90vw,420px)' }}
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="p-4 md:p-6 bg-[#A16341] text-white flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg md:text-xl font-semibold">Корзина</h2>
                                    <button onClick={closeCart} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                                        ✕
                                    </button>
                                </div>
                                <p className="text-xs md:text-sm text-white/70 mt-1">{totalCount} {totalCount === 1 ? 'товар' : totalCount < 5 ? 'товара' : 'товаров'}</p>
                            </div>

                            <div className="flex-1 overflow-auto p-4 md:p-6">
                                {items.length === 0 ? (
                                    <div className="text-center py-8 md:py-12">
                                        <div className="text-3xl md:text-4xl mb-4 text-gray-300"><BsCart3 className="mx-auto" /></div>
                                        <p className="text-gray-500 text-sm md:text-base">Корзина пуста</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3 md:space-y-4">
                                        {items.map(item => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.05 * items.indexOf(item) }}
                                                className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1 pr-2">
                                                        <h3 className="font-medium text-gray-900 text-sm md:text-base leading-tight">{item.title}</h3>
                                                        <p className="text-[#A16341] font-medium text-xs md:text-sm mt-1">{parseFloat(item.price).toLocaleString()}₽ за шт.</p>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-[#A16341] transition-colors p-1 rounded">✕</button>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center bg-[#A16341]/10 rounded-full">
                                                        <button onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-[#A16341]/20 rounded-l-full transition-colors text-[#A16341] text-sm md:text-base">−</button>
                                                        <span className="px-2 md:px-3 font-medium text-[#A16341] min-w-[2rem] text-center text-sm md:text-base">{item.qty}</span>
                                                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-[#A16341]/20 rounded-r-full transition-colors text-[#A16341] text-sm md:text-base">+</button>
                                                    </div>
                                                    <div className="font-semibold text-[#A16341] text-sm md:text-base">{(parseFloat(item.price) * item.qty).toLocaleString()}₽</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {items.length > 0 && (
                                <div className="p-4 md:p-6 bg-[#A16341]/5 flex-shrink-0 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-3 md:mb-4">
                                        <span className="text-base md:text-lg text-gray-800">Итого:</span>
                                        <span className="text-xl md:text-2xl font-bold text-[#A16341]">{total.toLocaleString()}₽</span>
                                    </div>
                                    <PayPalButtons
                                        style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError={onError}
                                        disabled={total <= 0}
                                    />
                                </div>
                            )}
                        </motion.div>
                    )}

                    {isMobile && (
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed left-0 right-0 bottom-0 bg-white z-[60] flex flex-col rounded-t-2xl shadow-2xl"
                            style={{ height: typeof window !== 'undefined' && window.innerHeight < 700 ? '95vh' : '90vh', maxHeight: '95vh' }}
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="p-4 bg-[#A16341] text-white flex-shrink-0">
                                <div className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-3" aria-hidden />
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Корзина</h2>
                                    <button onClick={closeCart} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white">✕</button>
                                </div>
                                <p className="text-sm text-white/70 mt-1">{totalCount} {totalCount === 1 ? 'товар' : totalCount < 5 ? 'товара' : 'товаров'}</p>
                            </div>

                            <div className="flex-1 overflow-auto p-4" style={{ minHeight: 0 }}>
                                {items.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="text-4xl mb-4 text-gray-300"><BsCart3 className="mx-auto" /></div>
                                        <p className="text-gray-500">Корзина пуста</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {items.map(item => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.05 * items.indexOf(item) }}
                                                className="bg-gray-50 rounded-xl p-3 border border-gray-100"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1 pr-2">
                                                        <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">{item.title}</h3>
                                                        <p className="text-[#A16341] font-medium text-sm mt-1">{parseFloat(item.price).toLocaleString()}₽ за шт.</p>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-[#A16341] transition-colors p-1 rounded flex-shrink-0">✕</button>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center bg-[#A16341]/10 rounded-full">
                                                        <button onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-[#A16341]/20 rounded-l-full transition-colors text-[#A16341]">−</button>
                                                        <span className="px-3 font-medium text-[#A16341] min-w-[2.5rem] text-center">{item.qty}</span>
                                                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[#A16341]/20 rounded-r-full transition-colors text-[#A16341]">+</button>
                                                    </div>
                                                    <div className="font-semibold text-[#A16341] flex-shrink-0 ml-2">{(parseFloat(item.price) * item.qty).toLocaleString()}₽</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {items.length > 0 && (
                                <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0 safe-area-bottom">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-lg text-gray-800">Итого:</span>
                                        <span className="text-xl font-bold text-[#A16341]">{total.toLocaleString()}₽</span>
                                    </div>
                                    <PayPalButtons
                                        style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError={onError}
                                        disabled={total <= 0}
                                    />
                                </div>
                            )}
                        </motion.div>
                    )}
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
