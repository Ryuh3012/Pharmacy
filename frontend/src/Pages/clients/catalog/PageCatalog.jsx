import React from 'react';
import { useNavigate } from 'react-router';
import Layout from '../../Layout';

import HeroCarousel from '../../components/Navbar/carousel/HeroCarousel';
import PromoCarousel from '../../components/Navbar/carousel/CarouselPromocion';
import ProductCarousel from '../../components/Navbar/carousel/Carousel';

import Img from "../../../assets/farm.jpg";
import Img2 from "../../../assets/farmacia.jpg";
import Img3 from "../../../assets/hola.jpg";
import Img4 from "../../../assets/objetos.jpg";

const SLIDES_HERO = [
    { id: 0, src: Img, alt: "Lleva tu Pepsi al máximo" },
    { id: 1, src: Img2, alt: "Descuentos de Farmacia" },
    { id: 2, src: Img3, alt: "Promoción Especial" },
    { id: 3, src: Img4, alt: "Nuevos Objetos de Catálogo" }
];

const DATA_PROMOS = [
    { id: 1, discountTag: "30%", labelText: "Hasta 30% Dcto. en Cuidado Bucal", image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=400" },
    { id: 2, discountTag: "20%", labelText: "20% Dcto. en Helados", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400" },
    /* 🎯 Corregido: Se cambió 'text' por 'labelText' para mantener consistencia */
    { id: 3, discountTag: "20%", labelText: "20% Dcto. en Higiene del Hogar", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=400" },
    { id: 4, discountTag: "15%", labelText: "Hasta 15% Dcto. en Afeitado", image: "https://images.unsplash.com/photo-1626014903708-490f2302660d?q=80&w=400" }
];

const DB_PRODUCTS = [
    { id: "p1", labelText: "Refresco Coca-cola Sabor Original X 2 Lt", price: 778.75, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400", unitDetail: "Mililitros a Bs. 0.39" },
    { id: "p2", discountTag: "20%", labelText: "Galleta De Chocolate Samba Savoy Fresa X 32 Gr", price: 462.90, oldPrice: 578.62, image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=400", unitDetail: "Gramos a Bs. 14.47" },
    { id: "p3", labelText: "Snack Doritos Mega Queso X 150 Gr", price: 1785.40, image: "https://images.unsplash.com/photo-1599490659223-e1b98175ef6d?q=80&w=400", unitDetail: "Gramos a Bs. 11.90" },
    { id: "p4", labelText: "Galletas Le Biscuit Mini Piruetas X 150 Gr", price: 865.68, image: "https://images.unsplash.com/photo-1558961312-503453e08a3b?q=80&w=400", unitDetail: "Gramos a Bs. 5.77" }
];

const HEALTH_CATEGORIES = [
    { id: "c1", name: "Medicamentos", count: "1,240 productos", icon: "💊", ring: "border-blue-100 bg-blue-50/50 text-blue-600" },
    { id: "c2", name: "Dermocosmética", count: "480 productos", icon: "🧴", ring: "border-purple-100 bg-purple-50/50 text-purple-600" },
    { id: "c3", name: "Nutrición y Fitness", count: "310 productos", icon: "🍏", ring: "border-emerald-100 bg-emerald-50/50 text-emerald-600" },
    { id: "c4", name: "Mamá y Bebé", count: "250 productos", icon: "🍼", ring: "border-pink-100 bg-pink-50/50 text-pink-600" },
    { id: "c5", name: "Dispositivos Médicos", count: "190 productos", icon: "🩺", ring: "border-cyan-100 bg-cyan-50/50 text-cyan-600" },
    { id: "c6", name: "Cuidado del Adulto", count: "150 productos", icon: "🧑‍🦳", ring: "border-amber-100 bg-amber-50/50 text-amber-600" },
];

const PageCatalog = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryName) => {
        /* 🎯 Corregido: Se cambió '/seach' por '/search' */
        navigate(`/search?q=${encodeURIComponent(categoryName)}`);
    };

    return (
        <Layout>
            <section className='h-full w-full flex flex-col gap-6 p-4 max-w-[1400px] mx-auto pb-16'>

                <HeroCarousel slides={SLIDES_HERO} />

                <div className="bg-white dark:bg-gray-900 rounded-[5px] p-6 border border-gray-100 dark:border-gray-800/80 shadow-md">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight relative">
                            Categorías de Salud y Bienestar
                            <span className="absolute bottom-[-6px] left-0 w-12 h-[3px] bg-emerald-500 rounded-full"></span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {HEALTH_CATEGORIES.map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => handleCategoryClick(cat.name)}
                                className="flex flex-col items-center text-center p-5 rounded-xl border border-gray-100 dark:border-gray-800/60 bg-white dark:bg-gray-950/40 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-blue-500/40 hover:dark:border-blue-500/30 transition-all duration-300 ease-out group"
                            >
                                <div className={`w-16 h-16 rounded-full border ${cat.ring} flex items-center justify-center text-2xl mb-3.5 transition-transform duration-500 ease-out group-hover:scale-105 shadow-inner`}>
                                    <span className="drop-shadow-sm">{cat.icon}</span>
                                </div>

                                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 tracking-tight px-1">
                                    {cat.name}
                                </h3>

                                <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mt-1">
                                    {cat.count}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <PromoCarousel title="Promociones del Día" promos={DATA_PROMOS} />

                {/* Ambos ProductCarousel se alimentan de la DB simulada e implementan correctamente el redireccionamiento por ID */}
                <ProductCarousel
                    title="Alimentos y Bebidas"
                    products={DB_PRODUCTS}
                    seeAllUrl="/search?q=Alimentos"
                />

                <ProductCarousel
                    title="Cuidado Personal e Higiene"
                    products={DB_PRODUCTS}
                    seeAllUrl="/search?q=Higiene"
                />

                <div className="w-full bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-[5px] p-8 relative overflow-hidden border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#2B7DE2]/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="max-w-xl relative z-10 text-center md:text-left">
                        <div className="inline-block bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-[3px] uppercase tracking-wider mb-2">
                            Club de Bienestar Inteligente
                        </div>
                        <h3 className="text-xl md:text-2xl font-black tracking-tight">
                            ¿Tomas medicamentos de forma recurrentes?
                        </h3>
                        <p className="text-sm text-gray-300 mt-2 font-medium leading-relaxed">
                            Únete de forma gratuita y programa tus compras mensuales automáticamente con un <span className="text-emerald-400 font-bold">15% de descuento adicional</span> y envío prioritario.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10 shrink-0">
                        <button className="px-5 py-2.5 bg-[#4FA1F4] hover:bg-[#2B7DE2] text-white text-xs font-bold rounded-[4px] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95 text-center">
                            Inscribir mis Tratamientos
                        </button>
                        <button className="px-5 py-2.5 bg-transparent border border-gray-600 hover:border-gray-400 text-gray-200 text-xs font-bold rounded-[4px] transition-all duration-200 cursor-pointer text-center">
                            Conocer más
                        </button>
                    </div>
                </div>

            </section>
        </Layout>
    );
};

export default PageCatalog;