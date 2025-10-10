import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messageVariants = {
  initial: { opacity: 0, y: -10, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

const scrollInVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 18,
      delay: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const dotVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: ["0%", "-50%", "0%"],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "loop",
    }
  }
};


export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xzzjdvpq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Запрос на связь с менеджером от ${formData.name}, телефон: ${formData.phone}`
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '' });
      } else {
        setError('Произошла ошибка при отправке. Попробуйте еще раз.');
      }
    } catch (err) {
      setError('Произошла ошибка при отправке. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const AnimatedDot = ({ delay }) => (
    <motion.div
      className="w-1 h-1 bg-purple-300 rounded-full"
      variants={dotVariants}
      initial="start"
      animate="end"
      transition={{
        ...dotVariants.end.transition,
        delay,
      }}
    />
  );

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success-message"
          variants={messageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100 mb-10"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <motion.svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </motion.svg>
            </div>
            <motion.h2 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-2xl font-bold text-gray-800 mb-2">Спасибо! 🎉</motion.h2>
            <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-gray-600 mb-6">Ваша заявка отправлена. Наш менеджер свяжется с вами в ближайшее время.</motion.p>
            <motion.button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 bg-amber-800 text-white rounded-lg hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Отправить еще одну заявку
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="contact-form"
          initial="hidden"
          whileInView="visible"
          variants={scrollInVariants}
          viewport={{ once: false, amount: 0.2 }}
          exit="exit"
          className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100 mb-10"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4" id='i'>
              Форма связи с менеджером
            </h1>
            <div className="flex items-center">
              <div className="h-1 bg-amber-800 rounded-full w-24"></div>
              <div className="ml-4 flex space-x-1 h-3 items-end">
                <AnimatedDot delay={0.0} />
                <AnimatedDot delay={0.1} />
                <AnimatedDot delay={0.2} />
                <AnimatedDot delay={0.3} />
                <AnimatedDot delay={0.4} />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                }
              }}
            >
              <motion.div className="space-y-2" variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700">Ваше имя</label>
                <motion.input
                  type="text"
                  name="name"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-gray-400 text-gray-700"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(251, 146, 60, 0.4)" }}
                />
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Введите ваш email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-gray-400 text-gray-700"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(251, 146, 60, 0.4)" }}
                />
              </motion.div>

              <motion.div className="space-y-2" variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700">Телефон</label>
                <motion.input
                  type="tel"
                  name="phone"
                  placeholder="Введите ваш телефон"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder-gray-400 text-gray-700"
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(251, 146, 60, 0.4)" }}
                />
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  key="error-message"
                  variants={messageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                    </svg>
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-end pt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-3 bg-amber-800 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium text-lg min-w-40 flex items-center justify-center"
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                animate={isSubmitting ? { scale: 0.98, opacity: 0.8 } : { scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.svg
                      className="-ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </motion.svg>
                    Отправка...
                  </>
                ) : (
                  'Отправить'
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 ">
            <p className="text-sm text-gray-500 text-center">
              Нажимая "Отправить", вы соглашаетесь на обработку персональных данных
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}