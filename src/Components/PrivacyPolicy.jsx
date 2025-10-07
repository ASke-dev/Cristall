import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <motion.div
      className="bg-[#3E2723] text-white min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-20 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-10 md:mb-12 text-[#FFCCBC]"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Политика конфиденциальности
      </motion.h1>

      <motion.div
        className="space-y-8 md:space-y-10 max-w-4xl mx-auto text-base md:text-lg leading-relaxed text-[#FBE9E7]"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.section
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[#FFAB91] mb-4">
            1. Общие положения
          </h2>
          <p>
            Компания "Кристалл", специализирующаяся на производстве и продаже кондитерских изделий,
            уважает вашу конфиденциальность и стремится обеспечить защиту ваших персональных данных.
            Настоящая политика конфиденциальности описывает, какие данные мы собираем, как мы их
            используем и какие меры предпринимаем для их защиты.
          </p>
        </motion.section>

        <motion.section
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[#FFAB91] mb-4">
            2. Какие данные мы собираем
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Имя, фамилия и контактные данные (телефон, e-mail);</li>
            <li>Адрес доставки для оформления заказов;</li>
            <li>Информация о заказах, предпочтениях и отзывах;</li>
            <li>Данные о посещении сайта (cookies, IP-адрес, поведение на сайте).</li>
          </ul>
        </motion.section>

        <motion.section
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[#FFAB91] mb-4">
            3. Как мы используем вашу информацию
          </h2>
          <p>
            Все данные используются исключительно для:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Обработки и доставки ваших заказов;</li>
            <li>Улучшения качества обслуживания и ассортимента;</li>
            <li>Анализа предпочтений и персонализации предложений;</li>
            <li>Связи с вами по вопросам заказов и новостей от "Кристалл".</li>
          </ul>
        </motion.section>

        <motion.section
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[#FFAB91] mb-4">
            4. Безопасность
          </h2>
          <p>
            Мы принимаем все разумные меры для защиты ваших данных: используем защищённые протоколы,
            сертифицированные платёжные шлюзы и регулярный аудит безопасности.
            Доступ к информации имеют только уполномоченные сотрудники.
          </p>
        </motion.section>

        <motion.section
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-[#FFAB91] mb-4">
            5. Cookies
          </h2>
          <p>
            Наш сайт использует cookies для анализа посещаемости и повышения качества сервиса.
            Вы можете отключить их в настройках браузера, однако это может повлиять на функциональность сайта.
          </p>
        </motion.section>

        <motion.p
          className="text-center pt-8 text-sm opacity-80"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          Последнее обновление: Октябрь 2025 г.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicy;