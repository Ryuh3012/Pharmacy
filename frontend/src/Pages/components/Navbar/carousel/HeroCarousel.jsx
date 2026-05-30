import { useEffect, useState } from 'react';

const HeroCarousel = ({ slides = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = () => setCurrentSlide((p) => (p === slides.length - 1 ? 0 : p + 1));
    const prevSlide = () => setCurrentSlide((p) => (p === 0 ? slides.length - 1 : p - 1));

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isHovered, slides.length]);

    if (!slides.length) return null;

    return (
        <article 
            className="relative w-full overflow-hidden rounded-2xl border dark:border-gray-800 shadow-xs group/hero"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-44 sm:h-64 md:h-[360px] lg:h-[400px] w-full bg-gray-100 dark:bg-gray-950">
                {slides.map((slide, index) => (
                    <div 
                        key={slide.id || index} 
                        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                            currentSlide === index 
                                ? 'opacity-100 scale-100 z-10' 
                                : 'opacity-0 scale-[1.02] z-0 pointer-events-none'
                        }`}
                    >
                        <img 
                            src={slide.src} 
                            className="w-full h-full object-cover object-center select-none" 
                            alt={slide.alt || "Banner Promocional"} 
                            draggable="false"
                        />
                    </div>
                ))}
            </div>

            <div className="absolute z-20 flex -translate-x-1/2 bottom-5 left-1/2 space-x-2.5 bg-black/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`h-2 rounded-full transition-all duration-300 ease-out cursor-pointer ${
                            currentSlide === index ? 'bg-white w-6 shadow-sm' : 'bg-white/50 w-2 hover:bg-white/80'
                        }`}
                        aria-label={`Ir al banner ${index + 1}`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>

            <button 
                onClick={prevSlide} 
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-md transition-all duration-300 opacity-0 transform -translate-x-2 group-hover/hero:opacity-100 group-hover/hero:translate-x-0 cursor-pointer border border-gray-100/50 dark:border-gray-700/50" 
                type="button"
                aria-label="Banner anterior"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button 
                onClick={nextSlide} 
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 dark:bg-gray-900/80 hover:bg-white dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-md transition-all duration-300 opacity-0 transform translate-x-2 group-hover/hero:opacity-100 group-hover/hero:translate-x-0 cursor-pointer border border-gray-100/50 dark:border-gray-700/50" 
                type="button"
                aria-label="Siguiente banner"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </article>
    );
};

export default HeroCarousel;