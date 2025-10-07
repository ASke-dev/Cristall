import React from "react";
import { FaLightbulb, FaHandshake, FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const AboutUs = () => {

  const values = [
    { title: "Инновации", icon: FaLightbulb, color: "text-amber-600", description: "Мы не боимся экспериментировать и искать новые пути для лучших результатов." },
    { title: "Сотрудничество", icon: FaHandshake, color: "text-orange-600", description: "Сила нашей команды в открытом общении и совместной работе." },
    { title: "Качество", icon: FaStar, color: "text-yellow-700", description: "Стремимся к совершенству в каждой детали." },
    { title: "Ориентированность на клиента", icon: FaStar, color: "text-gray-800", description: "Ваши потребности — наш приоритет." },
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 20 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">


        <header className="py-12 md:py-16 text-center">
          <motion.div initial="hidden" animate="show" variants={containerVariants}>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-900"
            >
              О нас
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Мы — команда, стоящая за Кристалл, объединяющая страсть к инновациям и стремление к совершенству.
            </motion.p>
          </motion.div>
        </header>



        <section className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          {[
            { title: "Наша Миссия", text: "Предоставить нашим пользователям самые передовые и надежные решения.", border: "border-amber-600" },
            { title: "Наше Видение", text: "Создать будущее, в котором Кристалл — синоним качества и инноваций.", border: "border-orange-700" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={itemVariants}
              transition={{ delay: i * 0.2 }}
            >
              <div className={`bg-white p-6 sm:p-8 rounded-xl shadow-lg border-t-4 ${item.border} transition duration-300 hover:shadow-xl hover:scale-[1.01]`}>
                <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${item.border === "border-amber-600" ? "text-amber-700" : "text-orange-700"}`}>{item.title}</h2>
                <p className="text-base sm:text-lg text-gray-700">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </section>



        <section className="mb-16 md:mb-20 py-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-10 text-gray-800">Ключевые Ценности</h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <div className="h-full min-h-[250px] p-6 rounded-lg border border-gray-200 bg-white hover:border-amber-500 transition duration-300 shadow-md flex flex-col items-center text-center">
                  <value.icon className={`w-10 h-10 sm:w-12 sm:h-12 mb-4 ${value.color}`} />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">{value.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </section>



        <section className="text-center bg-amber-50 p-8 md:p-10 rounded-xl shadow-lg border-t-4 border-amber-600">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={containerVariants}>
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold mb-4 md:mb-6 text-gray-800">Примкни к нам</motion.h2>
            <motion.p variants={itemVariants} transition={{ delay: 0.2 }} className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto mb-6">
              Ваше доверие — наш главный стимул. Начните свое путешествие с нами уже сегодня.
            </motion.p>
          </motion.div>
          <NavLink
            to="/contacts"
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 mt-4 text-base sm:text-lg font-semibold text-white rounded-full bg-gradient-to-r from-amber-600 to-orange-800 hover:from-amber-700 hover:to-orange-900 transition duration-300 shadow-lg shadow-amber-500/50"
          >
            Связаться
          </NavLink>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;