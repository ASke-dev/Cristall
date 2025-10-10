import React from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const decorativePulseVariants = {
    initial: { scale: 1, opacity: 0.9, rotate: 0 },
    animate: {
        scale: [1, 1.15, 1],
        opacity: [0.9, 1, 0.85, 1, 0.9],
        rotate: [0, 5, -5, 3, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
        }
    }
};

const floatingVariants = {
    initial: { y: 0, x: 0 },
    animate: {
        y: [-10, 10, -10],
        x: [-5, 5, -5],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
        }
    }
};

const PurpleScribble = ({ className = "" }) => (
    <motion.svg
        className={className}
        width="200" height="80" viewBox="0 0 160 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden
        variants={floatingVariants}
        initial="initial"
        animate="animate"
    >
        <motion.path
            d="M6 28c18-12 36-12 54-6 18 6 36 6 54-6"
            stroke="#C084FC"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.95"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: 1,
                opacity: 0.95,
                transition: { duration: 1.5, ease: "easeInOut" }
            }}
        />
        <motion.path
            d="M10 38c14-10 30-10 46-4 16 6 32 6 48-6"
            stroke="#E9D5FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: 1,
                opacity: 0.6,
                transition: { duration: 1.5, delay: 0.2, ease: "easeInOut" }
            }}
        />
    </motion.svg>
);

const GreenCross = ({ className = "" }) => (
    <motion.svg
        className={className}
        width="70" height="70" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden
        variants={floatingVariants}
        initial="initial"
        animate="animate"
    >
        <motion.path
            d="M12 12L36 36"
            stroke="#99F6E4"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.8, ease: "easeOut" }
            }}
        />
        <motion.path
            d="M36 12L12 36"
            stroke="#99F6E4"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
            }}
        />
    </motion.svg>
);

const TinyStar = ({ className = "" }) => (
    <motion.svg
        className={className}
        width="70" height="70" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden
        variants={floatingVariants}
        initial="initial"
        animate="animate"
    >
        <motion.path
            d="M10 1.5l1.9 4 4.3.6-3.1 3 0.7 4.3L10 12.7 6.2 14.4l0.7-4.3L4 7.1l4.3-.6L10 1.5z"
            fill="#FDE68A"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.3
                }
            }}
        />
    </motion.svg>
);

const slideCardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 20,
            mass: 1,
            when: "beforeChildren",
            staggerChildren: 0.12,
        }
    }
};

const contentVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 0.5
        }
    }
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.6, rotate: -15, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: [0, 8, -8, 5, 0],
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 0.8,
            delay: 0.2,
            rotate: {
                duration: 1.2,
                ease: "easeInOut"
            }
        }
    }
};

const PrevArrow = ({ onClick }) => (
    <motion.button
        type="button"
        aria-label="Previous"
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center focus:outline-none hover:bg-gray-100 transition-colors`}
        onClick={onClick}
        whileHover={{ scale: 1.15, rotate: -5 }}
        whileTap={{ scale: 0.85 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
    </motion.button>
);

const NextArrow = ({ onClick }) => (
    <motion.button
        type="button"
        aria-label="Next"
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center focus:outline-none hover:bg-gray-100 transition-colors`}
        onClick={onClick}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.85 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
    </motion.button>
);

const SlideCard = ({ title, text, imgA, imgB }) => (
    <div className="px-2 md:px-8">
        <motion.div
            className="max-w-[1400px] mx-auto bg-rose-50 rounded-3xl p-6 md:p-16 flex flex-col md:flex-row items-center gap-6 md:gap-10 relative overflow-visible min-h-[320px] md:min-h-[440px]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={slideCardVariants}
        >
            <div className="pointer-events-none">
                <div className="absolute -left-0 -top-0 transform -rotate-6 opacity-95">
                    <PurpleScribble />
                </div>
                <div className="absolute right-20 -top-0 opacity-90 transform rotate-6">
                    <GreenCross />
                </div>
                <div className="absolute left-36 bottom-20 opacity-90">
                    <TinyStar />
                </div>
            </div>

            <div className="flex-1 max-w-3xl relative z-10 text-center md:text-left">
                <motion.h2
                    className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight whitespace-pre-line"
                    variants={contentVariants}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="mt-4 md:mt-6 text-base md:text-lg text-gray-600"
                    variants={contentVariants}
                >
                    {text}
                </motion.p>

            </div>

            <div className="w-full md:w-1/2 relative flex items-center justify-center min-w-[180px] z-10 mt-4 md:mt-0 h-64 md:h-full ">
                <motion.img
                    src={imgA}
                    alt="promo A"
                    className="w-40 md:w-72 object-cover rounded-xl absolute right-4 md:right-1 transform md:rotate-6 "
                    variants={imageVariants}
                    whileHover={{
                        scale: 1.05,
                        rotate: 10,
                        zIndex: 30,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                />
                <motion.img
                    src={imgB}
                    alt="promo B"
                    className="w-40 md:w-72 object-cover rounded-xl absolute left-4 md:left-1 md:-rotate-6 "
                    variants={imageVariants}
                    transition={{ ...imageVariants.visible.transition, delay: 0.4 }}
                    whileHover={{
                        scale: 1.05,
                        rotate: -10,
                        zIndex: 30,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                />
            </div>
        </motion.div>
    </div>
);

const Slider2 = () => {

    const slidesData = [
        {
            title: "Каждую пятницу 1+1 \nВкусный бонус!",
            text: "В соответствии с принципом неопределенности, возмущение плотности синхронизует солитон. Расслаивание синхронно. Не упустите свой двойной шанс!",
            imgA: "/left.png",
            imgB: "/right.png",
        },
        {
            title: "Субботний сюрприз \nСкидка до 50%",
            text: "В эту субботу действует специальная акция: получите бонус при заказе двух напитков. Наш менеджер ждет вашего звонка, чтобы рассказать детали.",
            imgA: "/left.png",
            imgB: "/right.png",
        },
        {
            title: "Наука и кристаллы: \nНовая коллекция",
            text: "Кристаллы — это не только красиво, но и полезно! Узнайте больше о свойствах и применении. Скидка 20% на все украшения до конца месяца.",
            imgA: "/left.png",
            imgB: "/right.png",
        },
    ];

    const settings = {
        dots: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        appendDots: dots => (
            <div className="absolute bottom-4 left-0 right-0 pointer-events-none">
                <ul className="flex justify-center items-center space-x-3 pointer-events-auto">{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <motion.div
                className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white border border-gray-300 shadow-sm"
                whileHover={{
                    scale: 1.3,
                    backgroundColor: '#F472B6',
                    borderColor: '#EC4899'
                }}
                whileTap={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
            />
        )
    };

    return (
        <div className="mt-12 mb-12 w-full mx-auto px-0 md:px-4 font-sans">
            <div className="relative">
                <Slider {...settings}>
                    {slidesData.map((slide, index) => (
                        <div key={index}>
                            <SlideCard
                                title={slide.title}
                                text={slide.text}
                                imgA={slide.imgA}
                                imgB={slide.imgB}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Slider2;