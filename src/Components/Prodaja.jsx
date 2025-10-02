import React, { useState, useEffect } from 'react';
import { Clock, Map, X } from 'lucide-react';

const ProductCard = ({ image }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsMapOpen(false);
    };
    if (isMapOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isMapOpen]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 duration-500">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt="Коллаж макарон"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Коллаж</h3>
              <p className="text-sm text-gray-600">Ахунская улица, 22А</p>
            </div>
            <button
              onClick={() => setIsMapOpen(true)}
              aria-haspopup="dialog"
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Map className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Пн - Пт 9:00 - 19:00</span>
            </div>

            <button className="px-4 py-2 border border-amber-700 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-700 hover:text-white transition-colors">
              Забронировать продукцию
            </button>
          </div>
        </div>
      </div>

      {isMapOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsMapOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-4xl w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="text-lg font-semibold">Google Maps</h3>
              <button
                onClick={() => setIsMapOpen(false)}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close map"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full h-96 sm:h-[500px]">
              <iframe
                title="Google Map — Ахунская улица, 22А"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95153.18055909952!2d74.51987!3d42.87462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7dc91b3c881%3A0x492ebcd9cd5e3eb6!2z0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1234567890"
                width="100%"
                height="100%"
          
                allowFullScreen
                loading="lazy"
                className="block"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function RetailSales() {
  const macaronImage =
    'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&h=600&fit=crop';

  const cards = Array(5).fill(macaronImage);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 ">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Продажи в рознице
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {cards.map((image, index) => (
            <ProductCard key={index} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}