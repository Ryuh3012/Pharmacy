import { useRef } from 'react';
import { Card } from '@heroui/react';

const PromoCarousel = ({ title, promos = [] }) => {
    const carouselRef = useRef(null);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;
            const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
            carouselRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
        }
    };

    return (
        <article className="bg-white dark:bg-gray-900 rounded-[5px] p-6 border border-gray-100 dark:border-gray-800/80 shadow-md">

            {title && <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 px-1">{title}</h2>}

            <div className="relative w-full">
                {/* ⬅️ Flecha Izquierda */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white shadow-md border flex items-center justify-center text-gray-400 hover:text-gray-700 opacity-0 group-hover/promo:opacity-100 transition-opacity duration-200"
                    type="button"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>

                {/* Contenedor */}
                <div
                    ref={carouselRef}
                    className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2 no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {promos.map((promo) => (
                        <div key={promo.id} className="snap-start shrink-0 w-[170px] sm:w-[190px]">
                            <Card className="flex flex-col items-center text-center p-5 rounded-xl border border-gray-100 dark:border-gray-800/60 bg-white dark:bg-gray-950/40 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-blue-500/40 hover:dark:border-blue-500/30 transition-all duration-300 ease-out group relative overflow-visible">

                                {/* 🟡 Badge Circular de Descuento */}
                                {promo.discountTag && (
                                    <div className="absolute top-3 left-3 z-20 bg-[#FAD154] text-gray-900 font-bold text-xs w-8 h-8 rounded-full flex items-center justify-center shadow-xs">
                                        {promo.discountTag}
                                    </div>
                                )}

                                {/* 🔵 Flecha de acción rápida arriba a la derecha */}
                                <button className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-[#4FA1F4] text-white flex items-center justify-center shadow-xs hover:bg-blue-600 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>

                                {/* 🖼️ Imagen Centrada */}
                                <div className="flex-1 flex items-center justify-center w-full my-2">
                                    <img src={promo.image} alt={promo.labelText} className="max-h-[120px] object-contain group-hover/card:scale-105 transition-transform duration-300" />
                                </div>

                                {/* 🏷️ Banner de Texto Inferior */}
                                <div className="w-full bg-[#FCE69C] text-gray-800 text-[11px] font-medium text-center py-1.5 rounded-md px-1 line-clamp-2 min-h-[36px] flex items-center justify-center leading-tight">
                                    {promo.labelText}
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* ➡️ Flecha Derecha */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white shadow-md border flex items-center justify-center text-gray-400 hover:text-gray-700 opacity-0 group-hover/promo:opacity-100 transition-opacity duration-200"
                    type="button"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </article>
    );
};

export default PromoCarousel;