import React from 'react';
import { motion } from 'framer-motion';

const PARTNERS = [
    {
        name: 'ЛЕНТА', bgColor: 'bg-blue-600', icon: (
            <svg className="w-4 h-4 md:w-6 md:h-6 mr-2 flex-shrink-0 text-white group-hover:text-amber-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor" />
                <path d="M8 10h8M8 14h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
        )
    },
    {
        name: 'самокат', bgColor: 'bg-pink-500', icon: (
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0 text-white group-hover:text-amber-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="white" />
            </svg>
        )
    },
    {
        name: 'МАГНИТ', bgColor: 'bg-red-600', icon: (
            <svg className="w-4 h-4 md:w-6 md:h-6 mr-2 flex-shrink-0 text-white group-hover:text-amber-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="8" r="3" fill="white" />
                <path d="M12 14c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z" fill="white" />
                <path d="M12 2L8 6h8l-4-4z" fill="white" />
            </svg>
        )
    },
    {
        name: 'СКИДКИНО', bgColor: 'bg-orange-500', icon: (
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0 text-white group-hover:text-amber-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c1.5 0 3 .5 4 1.5L15 5c-.5-.5-1.5-1-3-1s-2.5.5-3 1L8 3.5C9 2.5 10.5 2 12 2z" fill="white" />
                <circle cx="9" cy="8" r="1" fill="white" />
                <circle cx="15" cy="8" r="1" fill="white" />
                <path d="M12 10c-2 0-4 1-4 3v6c0 2 2 3 4 3s4-1 4-3v-6c0-2-2-3-4-3z" fill="#f97316" />
                <path d="M8 16c-1 0-2 .5-2 1.5S7 19 8 19M16 16c1 0 2 .5 2 1.5S17 19 16 19"
                    stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
        )
    },
    {
        name: 'Караван', bgColor: 'bg-teal-600', icon: (
            <svg className="w-4 h-4 md:w-6 md:h-6 mr-2 flex-shrink-0 text-white group-hover:text-amber-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 8l9-5 9 5v8c0 2-2 4-4 4H7c-2 0-4-2-4-4V8z" fill="white" />
                <path d="M12 3v10M8 7l4 4 4-4" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="16" r="1" fill="#000" />
                <circle cx="16" cy="16" r="1" fill="#000" />
            </svg>
        )
    },
    {
        name: 'Вкуснотека', bgColor: 'bg-purple-600', icon: (
            <svg className="w-4 h-4 md:w-6 md:h-6 mr-2 flex-shrink-0 text-white group-hover:text-amber-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L8 14H16L12 2z" fill="white" />
                <path d="M5 16l-1 5h16l-1-5H5z" fill="white" />
                <circle cx="12" cy="19" r="1" fill="white" />
            </svg>
        )
    },
];

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.1
        }
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Optoviy = () => {
    const scrollToContact = () => {
        document.getElementById('i')?.scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-12">

                <motion.div
                    className="bg-gradient-to-br from-orange-100 to-pink-50 rounded-3xl p-6 md:p-10 lg:p-14 relative overflow-hidden shadow-xl"
                    initial="hidden"
                    whileInView="visible"
                    variants={sectionVariants}
                    viewport={{ amount: 0.3 }}
                >
                    <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100">
                        <defs>
                            <pattern id="dot-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="0.5" fill="#f97316" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
                    </svg>

                    <div className="flex flex-col lg:flex-row justify-between items-start gap-10 relative z-10">
                        <div className="w-full lg:max-w-md xl:max-w-lg">
                            <motion.h1
                                className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight"
                                variants={itemVariants}
                            >
                                Оптовые продажи нашей продукции
                            </motion.h1>
                            <motion.p
                                className="text-gray-700 mb-6 md:mb-8 text-base md:text-lg xl:text-xl leading-relaxed"
                                variants={itemVariants}
                            >
                                Вы всегда можете приобрести нашу изысканную кондитерскую продукцию и стать партнёром, обеспечив своим покупателям высочайшее качество и неповторимый вкус.
                            </motion.p>
                            <motion.button
                                onClick={scrollToContact}
                                className="bg-amber-800 hover:bg-amber-700 active:bg-amber-800 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold transition-transform duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm md:text-base"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Запросить оптовый прайс-лист
                            </motion.button>
                        </div>

                        <div className="w-full lg:w-auto">
                            <motion.div
                                className="grid grid-cols-3 gap-4 md:gap-6"
                                variants={sectionVariants}
                            >
                                {PARTNERS.map((partner, index) => (
                                    <motion.div
                                        key={index}
                                        className={`group ${partner.bgColor} text-white px-3 py-4 rounded-xl font-bold text-center text-[10px] md:text-xs flex flex-col items-center justify-center min-h-[70px] md:min-h-[80px] shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                                        variants={itemVariants}
                                        whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                                        style={{ backgroundColor: partner.bgColor === 'bg-teal-600' ? '#0d9488' : undefined }}
                                    >
                                        {partner.icon}
                                        <span className="mt-1">{partner.name}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="bg-white rounded-3xl p-6 md:p-10 lg:p-14 shadow-lg border border-gray-100"
                    initial="hidden"
                    whileInView="visible"
                    variants={sectionVariants}
                    viewport={{ amount: 0.2 }}
                >
                    <motion.h2
                        className="text-2xl md:text-3xl xl:text-4xl font-extrabold text-gray-900 mb-8 md:mb-10 lg:mb-12 border-b pb-4 border-amber-900"
                        variants={itemVariants}
                    >
                        Условия и преимущества партнёрства
                    </motion.h2>

                    <div className="space-y-6 md:space-y-8 text-gray-700 leading-relaxed">
                        <motion.p
                            className="text-sm md:text-base lg:text-lg leading-loose bg-gray-50 p-4 rounded-lg border-l-4 border-amber-900"
                            variants={itemVariants}
                        >
                            В слабосинеевых полях (при флуктуации на уровне единиц процентов) лазер экстремально синхронизует эксимер.
                            Минимум по определению пространственно притягивает квантовый объект. Если для простоты пренебречь потерями на
                            теплопроводность, то ясно, что химическое соединение синхронно. Исследователями из разных лабораторий
                            неоднократно наблюдалось, как колебание поглощает фотон квазар, хотя этот факт нуждается в дальнейшей
                            тщательной экспериментальной проверке. Расщепление поглощает фотон. Течение среды усиливает осциллятор.
                        </motion.p>

                        <motion.p
                            className="text-sm md:text-base lg:text-lg leading-loose bg-gray-50 p-4 rounded-lg border-l-4 border-amber-900"
                            variants={itemVariants}
                        >
                            Нестационарность, как известно, быстро развивается, если плазма неустойчиво притягивает взрывной гамма-квант.
                            Силовое поле, по данным астрономических наблюдений, вращает пограничный. Если предварительно подвергнуть объекты
                            длительному вакуумированию, взвесь возбуждающе представляет собой фотон, хотя этот факт нуждается в
                            дальнейшей тщательной экспериментальной проверке. Расщепление поглощает фотон. Течение среды усиливает
                            осциллятор.
                        </motion.p>

                        <motion.p
                            className="text-sm md:text-base lg:text-lg leading-loose bg-gray-50 p-4 rounded-lg border-l-4 border-amber-900"
                            variants={itemVariants}
                        >
                            Волна едва ли квантуема. В самом общем случае струя бифокально стабилизирует фотон. Излучение, на первый взгляд,
                            переворачивает адронный гидродинамический удар, генерируя периодические импульсы синхротронного излучения.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
            <div id="i" className="h-px w-full"></div>
        </div>
    );
};

export default Optoviy;
