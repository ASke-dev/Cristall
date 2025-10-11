import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};


const Footer = () => {
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: 767px)`);

        const updateMobileState = (e) => {
            setIsMobile(e.matches);
        };

        setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change', updateMobileState);

        return () => mediaQuery.removeEventListener('change', updateMobileState);
    }, []);

    const animationProps = {
        initial: "hidden",
        whileInView: "visible",
        variants: containerVariants,
        viewport: {
            once: true,
            amount: 0.8
        }
    };


    return (
        <motion.footer
            className="bg-gray-900 text-white py-6 border-t border-amber-800/50 shadow-2xl"
            {...animationProps}
        >
            <div className="max-w-screen-2xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">

                <motion.div
                    className="text-center md:text-left text-sm text-gray-400 pointer-events-none"
                    variants={itemVariants}
                >
                    &copy; Кондитерские изделия «Кристалл», 2000–{new Date().getFullYear()} Made by: ASLAN
                </motion.div>

                <motion.div
                    className="flex flex-col md:flex-row items-center gap-4 text-sm"
                    transition={{ staggerChildren: 0.1 }}
                >
                    <motion.div
                        className="text-gray-300 hover:text-amber-400 duration-200"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >

                        <Link
                            to="/privacy"

                        >
                            Политика конфиденциальности
                        </Link>
                    </motion.div>
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-300 hover:text-amber-400 duration-200 font-semibold"
                    >

                        <NavLink
                            to="tel:+996501941268"
                        >
                            +996 (501) 941-268
                        </NavLink>
                    </motion.div>
                </motion.div>
            </div>
        </motion.footer>
    )
}

export default Footer;
