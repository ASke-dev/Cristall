import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem('cart');
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        try { localStorage.setItem('cart', JSON.stringify(items)); } catch { }
    }, [items]);

    const addToCart = product => {
        setItems(prev => {
            const found = prev.find(i => i.id === product.id);
            if (found) {
                return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = id => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const updateQty = (id, qty) => {
        setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
    };

    const clearCart = () => setItems([]);

    const totalCount = items.reduce((s, i) => s + i.qty, 0);
    const totalPrice = items.reduce((s, i) => s + (i.priceNumber || 0) * i.qty, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, totalCount, totalPrice, isOpen, openCart, closeCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
