import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

const DOWNLOAD_CONTENT = `
## О компании «Кристалл»: Искусство Сладости и Традиции

Добро пожаловать в мир **«Кристалл»** – кондитерской компании, где каждая конфета, торт и пирожное – это результат страстной любви к сладкому искусству и бескомпромиссной приверженности к качеству. Мы не просто производим сладости; мы создаем моменты радости, уюта и праздника, воплощая в жизнь самые смелые и нежные кулинарные фантазии.

---

### Наша История и Философия

История **«Кристалла»** началась более **30 лет назад** в маленькой семейной пекарне, основанной талантливым кондитером, мастером своего дела – **Александром Ивановым**. Его мечтой было возродить и преумножить классические рецепты, добавив к ним нотки современного изящества. С годами маленькое предприятие выросло в крупный производственный комплекс, но мы по-прежнему храним верность тем самым принципам, заложенным Александром: **только натуральные ингредиенты, только ручной труд там, где он незаменим, и постоянное стремление к совершенству вкуса**.
`;

const LOGOS = [
    {
        id: 1,
        label: 'Кондитерская «Лакомка»',
        svg: (
            <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 sm:w-16 sm:h-16" aria-hidden="false" role="img">
                <title>Торт</title>
                <ellipse cx="32" cy="40" rx="20" ry="6" fill="#FFDCEC" stroke="#DB2777" />
                <rect x="12" y="20" width="40" height="20" rx="4" fill="#FFF1F2" stroke="#FB7185" />
                <path d="M22 20c3-4 11-6 18 0" stroke="#FB7185" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 2,
        label: 'Шоколадная фабрика «Какао»',
        svg: (
            <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 sm:w-16 sm:h-16" aria-hidden="false" role="img">
                <title>Шоколад</title>
                <rect x="12" y="16" width="40" height="32" rx="3" fill="#6B4226" stroke="#4C2A19" />
                <g fill="#8B5E3C">
                    <rect x="16" y="20" width="8" height="10" rx="1" />
                    <rect x="28" y="20" width="8" height="10" rx="1" />
                    <rect x="40" y="20" width="8" height="10" rx="1" />
                    <rect x="16" y="32" width="8" height="12" rx="1" />
                    <rect x="28" y="32" width="8" height="12" rx="1" />
                    <rect x="40" y="32" width="8" height="12" rx="1" />
                </g>
            </svg>
        ),
    },
    {
        id: 3,
        label: 'Карамельная «Тянучка»',
        svg: (
            <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 sm:w-16 sm:h-16" aria-hidden="false" role="img">
                <title>Карамель</title>
                <g transform="translate(8,8)">
                    <ellipse cx="24" cy="20" rx="20" ry="12" fill="#FFD59E" stroke="#F59E0B" />
                    <path d="M2 20 L0 12 L8 16" fill="#FFD59E" stroke="#F59E0B" strokeWidth="1" />
                    <path d="M46 20 L54 16 L56 12 L46 20" fill="#FFD59E" stroke="#F59E0B" strokeWidth="1" />
                    <path d="M12 18 C18 14,30 14,36 18" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
                </g>
            </svg>
        ),
    },
    {
        id: 4,
        label: 'Мастерская «Макаронье»',
        svg: (
            <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 sm:w-16 sm:h-16" aria-hidden="false" role="img">
                <title>Макароны</title>
                <g>
                    <ellipse cx="20" cy="28" rx="14" ry="6" fill="#FDE68A" stroke="#F59E0B" />
                    <ellipse cx="44" cy="28" rx="14" ry="6" fill="#FBCFE8" stroke="#DB2777" />
                    <ellipse cx="32" cy="38" rx="14" ry="6" fill="#E0F2FE" stroke="#0369A1" />
                </g>
            </svg>
        ),
    },
    {
        id: 5,
        label: 'Капкейки «Сласть»',
        svg: (
            <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 sm:w-16 sm:h-16" aria-hidden="false" role="img">
                <title>Капкейк</title>
                <path d="M12 36c4 6 12 8 20 8s16-2 20-8" fill="#FDE68A" stroke="#F59E0B" />
                <path d="M16 36c2-8 10-12 16-12s14 4 16 12" fill="#FFF1F2" stroke="#FB7185" />
                <rect x="14" y="36" width="36" height="12" rx="4" fill="#FFD7A8" stroke="#F97316" />
            </svg>
        ),
    },
];

const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

const logoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const logoItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 12,
        },
    },
};

const scrollToFooter = () => {
    const el = document.getElementById('i');
    if (el) {
        el.scrollIntoView({
            behavior: 'smooth'
        });
    }
};

export default function BakeryComponent() {
    const handleDownload = () => {
        const blob = new Blob([DOWNLOAD_CONTENT], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'наша-продукция.txt';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen font-sans bg-gradient-to-b from-orange-50 to-white overflow-x-hidden">

            <div className="bg-gradient-to-br from-orange-100 via-pink-50 to-orange-100 py-16 px-4 sm:px-6 lg:px-8 shadow-inner">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:justify-between gap-8">
         
                        <motion.div
                            className="hidden md:block"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 12, opacity: 1 }}
                            transition={{ duration: 1.5, type: 'spring', stiffness: 50 }}
                        >
                            <svg className="w-28 h-28 text-orange-300" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 30 Q 35 10 50 30 T 80 30" className="opacity-70" />
                                <circle cx="50" cy="70" r="25" className="fill-orange-200 stroke-orange-400" />
                                <path d="M 50 45 L 50 95" className="stroke-orange-400" />
                                <circle cx="50" cy="40" r="10" className="fill-pink-200 stroke-pink-400" />
                            </svg>
                        </motion.div>

                        <motion.div
                            className="text-center flex-1 px-2"
                            variants={heroContainerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight"
                                variants={heroItemVariants}
                            >
                                Кондитерское <span className="text-orange-600">искусство</span>
                            </motion.h1>

                            <motion.p
                                className="text-gray-700 max-w-xl mx-auto mb-8 leading-relaxed text-sm sm:text-base"
                                variants={heroItemVariants}
                            >
                                Мы объединяем лучшие кондитерские мастерские региона: авторские рецептуры, качественные ингредиенты и внимание к каждой детали дают изысканный вкус и праздничное настроение.
                            </motion.p>

                            <motion.div
                                className="flex flex-col sm:flex-row items-center justify-center gap-3"
                                variants={heroItemVariants}
                            >
                                <motion.button
                                    onClick={handleDownload}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 duration-300 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transform transition-transform"
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(234, 88, 12, 0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Скачать список продукции"
                                >
                                    <Download size={18} />
                                    <span className="text-base">Скачать прайс-лист</span>
                                </motion.button>

                                <motion.button
                                    onClick={scrollToFooter}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-orange-50 text-orange-600 border border-orange-300 font-medium px-6 py-3 rounded-xl shadow-md transform transition-all"
                                    whileHover={{ scale: 1.05, boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Связаться с менеджером"
                                >
                                    <FileText size={18} />
                                    <span className="text-base">Связаться с менеджером</span>
                                </motion.button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="hidden md:block"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: -12, opacity: 1 }}
                            transition={{ duration: 1.5, type: 'spring', stiffness: 50 }}
                        >
                            <svg className="w-24 h-24 text-pink-200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 30 C40 10, 60 10, 80 30" className="fill-pink-100 stroke-pink-300 opacity-60" />
                                <path d="M80 30 C75 50, 60 65, 50 80" className="stroke-pink-400" />
                                <path d="M20 30 C25 50, 40 65, 50 80" className="stroke-pink-400" />
                            </svg>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="py-12 sm:py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        className="text-2xl font-bold text-gray-800 mb-8 text-center border-b pb-4 border-orange-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        Наши <span className="text-orange-500">кондитерские партнёры</span>
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6"
                        variants={logoContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {LOGOS.map((logo) => (
                            <motion.div
                                key={logo.id}
                                className="bg-white rounded-xl p-6 flex flex-col items-center justify-center border border-gray-100 shadow-md cursor-pointer"
                                variants={logoItemVariants}
                                whileHover={{ y: -5, boxShadow: "0 15px 20px rgba(0, 0, 0, 0.1)", backgroundColor: "#FFF7ED" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center justify-center text-orange-500 mb-3">
                                    {logo.svg}
                                </div>
                                <span className="mt-2 text-sm font-medium text-gray-700 text-center">{logo.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <footer id="i" className="bg-white ">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <div className="flex items-center gap-3">
                            <FileText size={24} className="text-orange-500" />
                            <p className="font-bold text-lg text-white">Документы и Контакты</p>
                        </div>
                        <p className="text-sm text-gray-400 mt-1 text-center md:text-left">
                            Прайс-листы, сертификаты, инструкции и форма обратной связи.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a href="mailto:manager@krystall.com" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                            <span className="text-sm">Написать менеджеру</span>
                        </a>
                        <button
                            onClick={handleDownload}
                            className="inline-flex items-center gap-2 bg-white text-orange-700 hover:bg-orange-100 font-medium px-4 py-2 rounded-lg border border-orange-300 transition-colors"
                        >
                            <Download size={16} />
                            <span className="text-sm">Скачать все документы</span>
                        </button>
                    </div>
                </div>

            </footer>
        </div>
    );
}
