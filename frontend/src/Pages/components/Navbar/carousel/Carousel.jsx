import { useRef, useState } from 'react';
import { useNavigate } from 'react-router'; 
import { Card } from '@heroui/react';

const ProductCarousel = ({ title, products = [], seeAllUrl = "" }) => {
    const carouselRef = useRef(null);
    const navigate = useNavigate(); 

    const [cartQuantities, setCartQuantities] = useState({});
    const [favorites, setFavorites] = useState({});

    const formatBs = (value) => {
        return new Intl.NumberFormat('es-VE', {
            style: 'currency',
            currency: 'VES',
            minimumFractionDigits: 2
        }).format(value).replace("VES", "Bs.");
    };

    const scroll = (direction) => {
        if (carouselRef.current) {
            const { scrollLeft, clientWidth } = carouselRef.current;
            const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
            carouselRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' });
        }
    };

    const handleAddProduct = (id) => {
        setCartQuantities(prev => ({ ...prev, [id]: 1 }));
    };

    const handleIncrement = (id) => {
        setCartQuantities(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const handleDecrement = (id) => {
        setCartQuantities(prev => {
            const current = prev[id] || 0;
            if (current <= 1) {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            }
            return { ...prev, [id]: current - 1 };
        });
    };

    const toggleFavorite = (id) => {
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSeeAllClick = () => {
        if (seeAllUrl) {
            navigate(seeAllUrl); 
        }
    };

    return (
        <article className="group/products bg-white dark:bg-gray-900 rounded-[5px] p-6 border border-gray-100 dark:border-gray-800/80 shadow-md">
            
            {title && (
                <div className="border-b border-gray-100 dark:border-gray-800 mb-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 pb-2 border-b-2 border-blue-500 tracking-tight relative top-[1px]">
                        {title}
                    </h2> 

                    {seeAllUrl && (
                        <button
                            onClick={handleSeeAllClick}
                            className="text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full cursor-pointer focus:outline-none select-none"
                            type="button"
                        >
                            Ver todos
                        </button>
                    )}
                </div>
            )}

            <div className="relative w-full">
                <button
                    onClick={() => scroll('left')}
                    className="absolute -left-4 top-1/3 z-30 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-blue-500 opacity-0 group-hover/products:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer"
                    type="button"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div
                    ref={carouselRef}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-3 px-1 no-scrollbar dynamic-scroller"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style>{`.dynamic-scroller::-webkit-scrollbar { display: none; }`}</style>

                    {products.map((product) => {
                        const productId = product.id || product._id;
                        const quantity = cartQuantities[productId] || 0;
                        const isFav = favorites[productId] || false;

                        return (
                            <div key={productId} className="snap-start shrink-0 w-[195px] sm:w-[220px]">
                                {/* 🎯 Corregido: Se añade el onClick para redirigir a la página del producto pasando su ID */}
                                <Card 
                                    onClick={() => navigate(`/producto/${productId}`)}
                                    className="flex flex-col items-center text-center p-5 rounded-xl border border-gray-100 dark:border-gray-800/60 bg-white dark:bg-gray-950/40 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-blue-500/40 hover:dark:border-blue-500/30 transition-all duration-300 ease-out group/card relative overflow-visible"
                                >

                                    {product.discountTag && (
                                        <div className="absolute top-3 left-3 z-20 bg-[#FAD154] text-gray-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-xs tracking-wider">
                                            {product.discountTag} OFF
                                        </div>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita que se dispare el click de la Card
                                            toggleFavorite(productId);
                                        }}
                                        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-xs border shadow-xs cursor-pointer ${isFav
                                            ? 'bg-red-50 dark:bg-red-950/30 border-red-100 text-red-500'
                                            : 'bg-white/80 dark:bg-gray-800/80 border-gray-100/60 dark:border-gray-700/60 text-gray-400 hover:text-red-500 hover:bg-red-50'
                                        }`}
                                        type="button"
                                    >
                                        <svg className="w-4 h-4" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </button>

                                    <div className="w-full flex items-center justify-center h-[130px] mt-4 mb-2 bg-slate-50/50 dark:bg-gray-950/30 rounded-xl p-2 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.labelText}
                                            className="max-h-[110px] max-w-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="w-full flex flex-col gap-1.5 mt-auto">
                                        <h3 className="text-gray-700 dark:text-gray-300 font-medium text-xs line-clamp-2 h-[34px] tracking-tight leading-tight group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors text-left">
                                            {product.labelText}
                                        </h3>

                                        <div className="flex flex-col min-h-[38px] justify-center text-left">
                                            {product.oldPrice && (
                                                <span className="text-gray-400 line-through text-[10px] tracking-wide mb-0.5">
                                                    {formatBs(product.oldPrice)}
                                                </span>
                                            )}
                                            <span className="text-[#2B7DE2] dark:text-blue-400 font-black text-base tracking-tight">
                                                {formatBs(product.price)}
                                            </span>
                                        </div>

                                        {product.unitDetail && (
                                            <span className="text-gray-400 dark:text-gray-500 text-[10px] font-medium -mt-1 text-left">
                                                {product.unitDetail}
                                            </span>
                                        )}

                                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50 dark:border-gray-800">
                                            <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124l-.317-5.115a3.375 3.375 0 00-2.87-2.87l-2.27-.228M14 3.5v7.5M10.5 3.5h3.5m0 0a3.375 3.375 0 013.375 3.375v1.5m-3.375-4.875L12 3" />
                                                </svg>
                                                <span>35 min</span>
                                            </div>

                                            {quantity === 0 ? (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Evita que se dispare el click de la Card
                                                        handleAddProduct(productId);
                                                    }}
                                                    className="w-8 h-8 rounded-full bg-[#4FA1F4] hover:bg-blue-600 text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                                                    aria-label="Agregar al carrito"
                                                    type="button"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <div
                                                    className="flex items-center bg-blue-50 dark:bg-blue-950/60 rounded-full h-8 px-1 border border-blue-100 dark:border-blue-900 shadow-inner"
                                                    onClick={(e) => e.stopPropagation()} // Evita que se dispare el click de la Card al tocar la zona del contador
                                                >
                                                    <button
                                                        onClick={() => handleDecrement(productId)}
                                                        className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-xs shadow-xs hover:bg-gray-100 transition-colors cursor-pointer"
                                                        type="button"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-2.5 text-blue-700 dark:text-blue-300 font-bold text-xs min-w-[20px] text-center">
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleIncrement(productId)}
                                                        className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-xs shadow-xs hover:bg-gray-100 transition-colors cursor-pointer"
                                                        type="button"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute -right-4 top-1/3 z-30 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-blue-500 opacity-0 group-hover/products:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer"
                    type="button"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </article>
    );
};

export default ProductCarousel;