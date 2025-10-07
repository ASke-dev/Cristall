import React, { useState, useEffect } from 'react';
import { Clock, Map, X } from 'lucide-react';
import { NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ image, title, address }) => {
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
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-600">{address}</p>
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

            <NavLink className="px-4 py-2 border border-amber-700 text-amber-700 rounded-full text-sm font-medium hover:bg-amber-700 hover:text-white transition-colors">
              Забронировать продукцию
            </NavLink>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMapOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setIsMapOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg max-w-4xl w-full overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95153.18055909952!2d74.51987!3d42.87462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7dc91b3c881%3A0x492ebcd9cd5e3eb6!2z0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1727970700000"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  className="block"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function RetailSales() {
  const cards = [
    {
      title: "Кондитерская «Sweet Life»",
      address: "Ахунская улица, 22А",
      image: "https://picsum.photos/seed/sweetlife/800/600",
    },
    {
      title: "Магазин «ChocoDream»",
      address: "Исанова 55",
      image: "https://picsum.photos/seed/choco/800/600",
    },
    {
      title: "Пекарня «Croissant House»",
      address: "Чуй проспект, 101",
      image: "https://picsum.photos/seed/croissant/800/600",
    },
    {
      title: "Десертная «Macaron Time»",
      address: "Молодая гвардия, 8",
      image: "https://picsum.photos/seed/macaron/800/600",
    },
    {
      title: "Кафе «Berry & Cream»",
      address: "Токтогула, 77",
      image: "https://picsum.photos/seed/berry/800/600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Продажи в рознице
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((c, index) => (
            <ProductCard
              key={index}
              image={c.image}
              title={c.title}
              address={c.address}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
