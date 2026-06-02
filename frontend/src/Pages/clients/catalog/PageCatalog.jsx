import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Layout from '../../Layout';

import PromoCarousel from '../../components/Navbar/carousel/CarouselPromocion';
import ProductCarousel from '../../components/Navbar/carousel/Carousel';

import Img4 from "../../../assets/objetos.jpg";

const DATA_PROMOS = [
    { id: 1, discountTag: "30%", labelText: "Hasta 30% Dcto. en Cuidado Bucal", image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=400" },
    { id: 2, discountTag: "20%", labelText: "20% Dcto. en Helados", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=400" },
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

const SUGGESTED_SYMPTOMS = [
    { name: "Fiebre y Dolor", icon: "🌡️" },
    { name: "Alergias", icon: "🤧" },
    { name: "Acidez Estomacal", icon: "🍋" },
    { name: "Gripe y Tos", icon: "🍃" },
    { name: "Multivitamínicos", icon: "✨" }
];

// Base de conocimientos simulada para el buscador inteligente de síntomas
const KNOWLEDGE_BASE = [
    { keywords: ["fiebre", "dolor", "cabeza", "malestar", "sadas"], solution: "Acetaminofén 650 mg", category: "Analgésicos", icon: "🌡️", targetSearch: "Acetaminofen" },
    { keywords: ["alergia", "estornudo", "picazon", "ronchas"], solution: "Loratadina 10 mg", category: "Antihistamínicos", icon: "🤧", targetSearch: "Loratadina" },
    { keywords: ["acidez", "estomago", "reflujo", "gases"], solution: "Omeprazol 20 mg", category: "Gastrointestinales", icon: "🍋", targetSearch: "Omeprazol" },
    { keywords: ["tos", "gripe", "resfriado", "moco"], solution: "Jarabe Natural Alivio", category: "Antigripales", icon: "🍃", targetSearch: "Gripe" }
];

const PageCatalog = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    // Estados del modal de recetas
    const [isScanning, setIsScanning] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [scanStep, setScanStep] = useState('idle');

    const handleCategoryClick = (categoryName) => {
        navigate(`/search?q=${encodeURIComponent(categoryName)}`);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowSuggestions(false);
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Filtrar soluciones en tiempo real según lo que escribe el usuario
    const getActiveSolutions = () => {
        if (!searchQuery.trim()) return [];
        const queryClean = searchQuery.toLowerCase();
        return KNOWLEDGE_BASE.filter(item => 
            item.keywords.some(keyword => queryClean.includes(keyword)) ||
            item.solution.toLowerCase().includes(queryClean) ||
            item.category.toLowerCase().includes(queryClean)
        );
    };

    const matchedSolutions = getActiveSolutions();

    const handleRecipeUpload = () => {
        setIsScanning(true);
        setShowModal(true);
        setScanStep('scanning');
        setTimeout(() => {
            setIsScanning(false);
            setScanStep('done');
        }, 3000);
    };

    return (
        <Layout>
            <section className='h-full w-full flex flex-col gap-6 p-4 max-w-[1400px] mx-auto pb-16 selection:bg-blue-500 selection:text-white relative'>

                {/* 🌟 PREMIUM HERO BANNER */}
                <div className="w-full min-h-[75vh] bg-gradient-to-tr from-[#EBF0FF] via-[#F4F7FF] to-[#E3E9FF] dark:from-[#0f172a] dark:via-[#131238] dark:to-[#0f172a] text-slate-900 dark:text-white rounded-3xl relative flex flex-col justify-between p-6 md:p-8 border border-white/60 dark:border-slate-800/60 shadow-xs">
                    
                    <style dangerouslySetInnerHTML={{__html: `
                        @keyframes orbitY { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
                        @keyframes orbitYDelayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(12px); } }
                        @keyframes heroScale { 0%, 100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.03) rotate(1deg); } }
                        @keyframes scanLine { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
                        .anim-float-fast { animation: orbitY 3.5s ease-in-out infinite; }
                        .anim-float-slow { animation: orbitYDelayed 5.5s ease-in-out infinite; }
                        .anim-hero-bottle { animation: heroScale 7s ease-in-out infinite; }
                        .animate-scan { animation: scanLine 2s linear infinite; }
                    `}} />

                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none animate-pulse"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto relative z-10 w-full">
                        <div className="lg:col-span-4 space-y-3 text-center lg:text-left">
                            <span className="text-[10px] font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase bg-blue-100/60 dark:bg-blue-900/40 px-2.5 py-1 rounded-md inline-block backdrop-blur-xs">
                                Smart Health Platform
                            </span>
                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.92]">
                                Farmapatria <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Inteligente</span>
                            </h1>
                        </div>

                        <div className="lg:col-span-4 flex justify-center items-center relative h-[280px] md:h-[350px]">
                            <img 
                                src={Img4} 
                                alt="Farmapatria Hub Visual" 
                                className="max-h-full max-w-[200px] md:max-w-full object-contain rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(30,58,138,0.3)] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-white dark:border-slate-800 anim-hero-bottle z-10"
                            />
                            <span className="absolute top-6 left-6 text-4xl select-none pointer-events-none anim-float-fast drop-shadow-md">💊</span>
                            <span className="absolute bottom-10 right-6 text-4xl select-none pointer-events-none anim-float-slow drop-shadow-md">🧬</span>
                            <span className="absolute top-1/2 -right-6 text-3xl select-none pointer-events-none anim-float-fast drop-shadow-md">🍃</span>
                        </div>

                        <div className="lg:col-span-4 text-center lg:text-right space-y-3">
                            <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/40 px-2.5 py-1 rounded-md backdrop-blur-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                                Delivery Express Atendido
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-slate-100 tracking-tighter leading-[0.92]">
                                Tu Receta <br /> En Minutos
                            </h2>
                        </div>
                    </div>

                    {/* Fila del Buscador y Módulos */}
                    <div className="w-full space-y-5 mt-6 relative z-30">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                            
                            <div 
                                onClick={handleRecipeUpload}
                                className="md:col-span-5 bg-white/40 dark:bg-slate-900/30 border border-white/80 dark:border-slate-800/60 p-4 rounded-2xl backdrop-blur-md shadow-xs hover:bg-white/70 dark:hover:bg-slate-900/50 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group overflow-hidden"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                                        📸
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-black text-slate-900 ">Escanear Receta con IA</p>
                                        <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Sube o arrastra la foto de tu indicación</p>
                                    </div>
                                </div>
                                <span className="text-xs font-black text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
                            </div>

                            <div className="md:col-span-7 bg-white/20 dark:bg-slate-900/10 border border-white/40 dark:border-slate-800/30 p-3 rounded-2xl backdrop-blur-xs flex flex-col justify-center text-left">
                                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">¿Qué necesitas aliviar hoy?</p>
                                <div className="flex flex-wrap gap-2">
                                    {SUGGESTED_SYMPTOMS.map((symptom, idx) => (
                                        <button 
                                            key={idx}
                                            type="button"
                                            onClick={() => {
                                                setSearchQuery(`Tengo ${symptom.name.toLowerCase()}`);
                                                setShowSuggestions(true);
                                            }}
                                            className="px-3 py-1.5 bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/40 dark:border-slate-700/50 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 shadow-2xs"
                                        >
                                            <span>{symptom.icon}</span> {symptom.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 🕵️‍♂️ BUSCADOR INTELIGENTE CON SUGERENCIA DE SÍNTOMAS INTEGRADA */}
                        <div className="w-full relative z-50">
                            <form onSubmit={handleSearchSubmit} className="w-full bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-1.5 shadow-lg flex items-center gap-2 relative z-50">
                                <span className="pl-3 text-slate-400 text-sm">🔍</span>
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onFocus={() => setShowSuggestions(true)}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    placeholder="Describe tu síntoma aquí (ej: 'tengo dolor de cabeza y fiebre')..." 
                                    className="w-full bg-transparent py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden"
                                />
                                <button type="submit" className="px-6 py-2.5 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs">
                                    Buscar
                                </button>
                            </form>

                            {/* Panel Predictivo de Soluciones Flotante Corregido */}
                            {showSuggestions && searchQuery.trim().length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-4 mt-2 z-50 text-left max-h-[350px] overflow-y-auto block">
                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                                        <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1">
                                            ✨ Solución Recomendada por IA Farmapatria
                                        </p>
                                        <button 
                                            type="button"
                                            onClick={() => setShowSuggestions(false)}
                                            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer px-2 py-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                                        >
                                            Ocultar
                                        </button>
                                    </div>

                                    {matchedSolutions.length > 0 ? (
                                        <div className="space-y-2">
                                            {matchedSolutions.map((item, idx) => (
                                                <div 
                                                    key={idx}
                                                    onClick={() => {
                                                        setShowSuggestions(false);
                                                        navigate(`/search?q=${encodeURIComponent(item.targetSearch)}`);
                                                    }}
                                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 dark:bg-slate-950/60 dark:hover:bg-blue-950/20 border border-slate-100 dark:border-slate-800/80 cursor-pointer transition-all group"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="text-xl w-9 h-9 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-2xs">
                                                            {item.icon}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black text-slate-90 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                {item.solution}
                                                            </p>
                                                            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                                                                Categoría: {item.category}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="text-[11px] font-black text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                                        Ver Solución →
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-4 text-center">
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                                                No identificamos un síntoma específico, pero puedes presionar "Buscar" para explorar todo el catálogo.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 🗂️ SECCIÓN DE CATEGORÍAS */}
                <div className="bg-white dark:bg-gray-900 rounded-[5px] p-6 border border-gray-100 dark:border-gray-800/80 shadow-md relative z-10">
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

                {/* CARRUSELES */}
                <PromoCarousel title="Promociones del Día" promos={DATA_PROMOS} />
                <ProductCarousel title="Alimentos y Bebidas" products={DB_PRODUCTS} seeAllUrl="/search?q=Alimentos" />
                <ProductCarousel title="Cuidado Personal e Higiene" products={DB_PRODUCTS} seeAllUrl="/search?q=Higiene" />

                {/* CLUB DE BIENESTAR */}
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

                {/* MODAL INTERACTIVO */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-all duration-300">
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden transform scale-100 transition-transform">
                            <button 
                                onClick={() => { setShowModal(false); setScanStep('idle'); }}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold cursor-pointer transition-colors"
                            >
                                ✕
                            </button>

                            {scanStep === 'scanning' && (
                                <div className="text-center py-6 space-y-4">
                                    <div className="w-24 h-32 bg-slate-100 dark:bg-slate-800 mx-auto rounded-xl relative overflow-hidden border-2 border-dashed border-blue-400/60 flex items-center justify-center">
                                        <span className="text-3xl">📄</span>
                                        <div className="absolute left-0 w-full h-1 bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-scan"></div>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base font-black text-slate-900 dark:text-white">Analizando Prescripción</h3>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium px-4">
                                            La IA está procesando el texto manuscrito y buscando coincidencias de inventario...
                                        </p>
                                    </div>
                                </div>
                            )}

                            {scanStep === 'done' && (
                                <div className="space-y-5 text-left py-2">
                                    <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl">✓</div>
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 dark:text-white">Lectura Exitosa</h3>
                                            <p className="text-[11px] font-medium text-slate-400">Componente validado e identificado</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-3.5 rounded-xl space-y-2">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 rounded-md">Medicamento</span>
                                            <span className="text-[10px] text-emerald-500 font-bold">● Disponible</span>
                                        </div>
                                        <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">Acetaminofén 650 mg</p>
                                        <p className="text-[11px] font-medium text-slate-400">Sugerencia clínica común para el alivio rápido de estados febriles y malestares musculares.</p>
                                    </div>

                                    <div className="flex gap-2.5 pt-2">
                                        <button 
                                            onClick={() => { setShowModal(false); setScanStep('idle'); }}
                                            className="w-1/2 py-2.5 bg-transparent border border-slate-200 dark:border-slate-700 hover:border-slate-400 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            onClick={() => { setShowModal(false); setScanStep('idle'); navigate('/search?q=Acetaminofen'); }}
                                            className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl transition-all cursor-pointer text-center shadow-md shadow-blue-500/10"
                                        >
                                            Ver Productos
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </section>
        </Layout>
    );
};

export default PageCatalog;