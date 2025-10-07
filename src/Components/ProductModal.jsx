import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductModal = ({ product, open, onClose }) => {
    const { addToCart } = useCart();
    const [index, setIndex] = useState(0);
    if (!product) return null;

    const images = product.images || [product.img];

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2, ease: "easeIn" }
        }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 40
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: 20,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                delay: 0.1
            }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                delay: 0.15
            }
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    />

                    <motion.div
                        className="relative bg-white rounded-2xl max-w-3xl w-full mx-4 md:mx-0 overflow-hidden shadow-2xl"
                        style={{ maxHeight: '90vh' }}
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="md:flex flex-col md:flex-row">
                            <motion.div
                                className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-4"
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="w-full">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={index}
                                            src={images[index]}
                                            alt={product.title}
                                            className="w-full h-[320px] md:h-[420px] object-cover rounded-lg"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </AnimatePresence>
                                </div>

                                {images.length > 1 && (
                                    <motion.div
                                        className="mt-3 w-full overflow-x-auto"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.3 }}
                                    >
                                        <div className="flex gap-2 px-1">
                                            {images.map((im, i) => (
                                                <motion.button
                                                    key={i}
                                                    onClick={() => setIndex(i)}
                                                    className={`w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 transition-colors ${i === index ? 'border-amber-700' : 'border-gray-200'}`}
                                                    whileHover={{ scale: 1.05, borderColor: '#92400e' }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <img src={im} alt={`${product.title}-${i}`} className="w-full h-full object-cover" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>

                            <motion.div
                                className="md:w-1/2 p-6 flex flex-col"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <motion.h3
                                            className="text-2xl font-serif font-semibold"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {product.title}
                                        </motion.h3>
                                        <motion.p
                                            className="text-sm text-gray-500 mt-2"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.25 }}
                                        >
                                            {product.description}
                                        </motion.p>
                                    </div>
                                    <motion.button
                                        onClick={onClose}
                                        className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        ✕
                                    </motion.button>
                                </div>

                                <motion.div
                                    className="mt-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="text-sm text-gray-500">{product.weight} · {product.calories}</div>
                                    <div className="text-2xl font-bold text-[#A16341] mt-4">{product.price}₽</div>
                                </motion.div>

                                <motion.div
                                    className="mt-auto pt-6"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                >
                                    <motion.button
                                        onClick={() => { addToCart(product); onClose(); }}
                                        className="w-full bg-[#A16341] text-white py-3 rounded-full font-medium shadow-lg"
                                        whileHover={{
                                            scale: 1.02,
                                            backgroundColor: '#92400e',
                                            boxShadow: '0 10px 25px rgba(161, 99, 65, 0.4)'
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        Добавить в корзину
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;