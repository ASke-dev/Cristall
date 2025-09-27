import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PurpleScribble = ({ className = "" }) => (
        <svg className={className} width="200" height="80" viewBox="0 0 160 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M6 28c18-12 36-12 54-6 18 6 36 6 54-6" stroke="#C084FC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95" />
                <path d="M10 38c14-10 30-10 46-4 16 6 32 6 48-6" stroke="#E9D5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
        </svg>
);

const GreenCross = ({ className = "" }) => (
        <svg className={className} width="70" height="70" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 12L36 36" stroke="#99F6E4" strokeWidth="3" strokeLinecap="round" />
                <path d="M36 12L12 36" stroke="#99F6E4" strokeWidth="3" strokeLinecap="round" />
        </svg>
);

const TinyStar = ({ className = "" }) => (
        <svg className={className} width="70" height="70" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M10 1.5l1.9 4 4.3.6-3.1 3 0.7 4.3L10 12.7 6.2 14.4l0.7-4.3L4 7.1l4.3-.6L10 1.5z" fill="#FDE68A" />
        </svg>
);

const PrevArrow = ({ className, style, onClick }) => (
        <button
                type="button"
                aria-label="Previous"
                className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center focus:outline-none`}
                style={{ ...style }}
                onClick={onClick}
        >
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
        </button>
);

const NextArrow = ({ className, style, onClick }) => (
        <button
                type="button"
                aria-label="Next"
                className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center focus:outline-none`}
                style={{ ...style }}
                onClick={onClick}
        >
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
        </button>
);

const Slider2 = () => {
        const settings = {
                dots: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                pauseOnHover: true,
                arrows: false,
                prevArrow: <PrevArrow />,
                nextArrow: <NextArrow />,
                appendDots: dots => (
                        <div className="absolute bottom-4 left-0 right-0 pointer-events-none">
                                <ul className="flex justify-center items-center space-x-3 pointer-events-auto">{dots}</ul>
                        </div>
                ),
                customPaging: i => (
                        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white border border-gray-300 shadow-sm" />
                )
        };

        const SlideCard = ({ title, text, imgA, imgB }) => (
                <div className="px-2 md:px-8">
                        <div className="max-w-[1400px] mx-auto bg-rose-50 rounded-3xl p-6 md:p-16 flex flex-col md:flex-row items-center gap-6 md:gap-10 relative overflow-visible min-h-[320px] md:min-h-[440px]">
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
                                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight whitespace-pre-line">{title}</h2>
                                        <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600">{text}</p>
                                </div>

                                <div className="w-full md:w-1/2 relative flex items-center justify-center min-w-[180px] z-10 mt-4 md:mt-0">
                                        <img src={imgA} alt="promo A" className="w-40 md:w-72 object-cover rounded-xl absolute right-4 md:right-1  transform md:rotate-6 shadow-lg" />
                                        <img src={imgB} alt="promo B" className="w-40 md:w-72 object-cover rounded-xl absolute left-4 md:left-1 md:-rotate-6 shadow-lg" />
                                </div>
                        </div>
                </div>
        );

        return (
                <div className="mt-8 mb-8 w-full mx-auto px-4">
                        <div className="relative">
                                <Slider {...settings}>
                                        <div>
                                                <SlideCard
                                                        title={"Каждую пятницу 1+1"}
                                                        text="В соответствии с принципом неопределенности, возмущение плотности синхронизует солитон. Расслаивание синхронно."
                                                        imgA="/right.png"
                                                        imgB="/left.png"
                                                />
                                        </div>
                                        <div>
                                                <SlideCard
                                                        title="Субботний сюрприз"
                                                        text="В эту субботу действует специальная акция: получите бонус при заказе двух напитков. Не упустите шанс!"
                                                        imgA="/right.png"
                                                        imgB="/left.png"
                                                />
                                        </div>
                                        <div>
                                                <SlideCard
                                                        title="Наука и кристаллы"
                                                        text="Кристаллы — это не только красиво, но и полезно! Узнайте больше о свойствах и применении."
                                                        imgA="/right.png"
                                                        imgB="/left.png"
                                                />
                                        </div>
                                </Slider>
                        </div>
                </div>
        );
}

export default Slider2;