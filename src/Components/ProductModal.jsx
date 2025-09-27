import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductModal = ({ product, open, onClose }) => {
    const { addToCart } = useCart();
    const [index, setIndex] = useState(0);
    if (!product) return null;

    // images array: you can set multiple images per product in `Cards.jsx`
    const images = product.images || [product.img];

    return (
        <div className={`fixed inset-0 z-60 flex items-center justify-center ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
            <div className={`fixed inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}></div>
            <div className={`relative bg-white rounded-2xl max-w-3xl w-full mx-4 md:mx-0 z-70 overflow-hidden transform transition-all ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ maxHeight: '90vh' }}>
                <div className="md:flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-4">
                        <div className="w-full">
                            {/* single main image - not a slider */}
                            <img src={images[index]} alt={product.title} className="w-full h-[320px] md:h-[420px] object-cover rounded-lg" />
                        </div>

                        {/* thumbnails below - clicking sets main image (scrollable on mobile) */}
                        {images.length > 0 && (
                            <div className="mt-3 w-full overflow-x-auto">
                                <div className="flex gap-2 px-1">
                                    {images.map((im, i) => (
                                        <button key={i} onClick={() => setIndex(i)} className={`w-16 h-16 flex-shrink-0 rounded overflow-hidden border ${i === index ? 'border-amber-700' : 'border-gray-200'}`}>
                                            <img src={im} alt={`${product.title}-${i}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="md:w-1/2 p-6 flex flex-col">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-2xl font-serif font-semibold">{product.title}</h3>
                                <p className="text-sm text-gray-500 mt-2">{product.description}</p>
                            </div>
                            <button onClick={onClose} className="text-gray-500">✕</button>
                        </div>

                        <div className="mt-4">
                            <div className="text-sm text-gray-500">{product.weight} · {product.calories}</div>
                            <div className="text-2xl font-bold text-[#A16341] mt-4">{product.price}₽</div>
                        </div>

                        <div className="mt-auto">
                            <button onClick={() => { addToCart(product); onClose(); }} className="w-full bg-[#A16341] text-white py-3 rounded-full">Добавить в корзину</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
