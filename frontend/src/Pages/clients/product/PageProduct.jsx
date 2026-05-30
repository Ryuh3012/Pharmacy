import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router'; // Importamos useSearchParams
import Layout from '../../Layout';

// Base de datos compartida para buscar de forma dinámica por ID
const ALL_PRODUCTS_DB = [
    { id: "s1", category: "Medicamentos", brand: "Leti", labelText: "Acetaminofen 650mg 10tabletas Genven", price: 293.25, oldPrice: 345.00, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400", deliveryTime: "35 mins", rating: "4.9", reviews: "195", composition: "Acetaminofén (Paracetamol)", specs: [{ label: "Laboratorio", value: "Leti", icon: "🏢" }, { label: "Presentación", value: "Tabletas", icon: "🧪" }] },
    { id: "s2", category: "Medicamentos", brand: "JL Pharma", labelText: "Paracetamol 1g/100ml Jl Pharma Solución Inyectable", price: 3633.75, oldPrice: 4275.00, image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=400", deliveryTime: "35 mins", rating: "5.0", reviews: "2", composition: "Paracetamol", specs: [{ label: "Laboratorio", value: "JL Pharma", icon: "🏢" }] },
    { id: "s3", category: "Medicamentos", brand: "Distrilab", labelText: "Paracetamol 1g 100ml comprimidos", price: 3113.24, oldPrice: 3662.63, image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=400", deliveryTime: "35 mins", rating: "5.0", reviews: "1", composition: "Paracetamol", specs: [{ label: "Laboratorio", value: "Distrilab", icon: "🏢" }] },
    // Agregamos el producto de jarabe que tenías mapeado con ID s7
    {
        id: "s7",
        brand: "OFTALMI",
        labelText: "Acetaminofén 180mg/5ml Apiret Oftalmi Jarabe x 120 ml",
        rating: "4.8",
        reviews: "67",
        composition: "Acetaminofén (Paracetamol)",
        price: 2286.70,
        oldPrice: 3518.00,
        deliveryTime: "35 min",
        images: [
            "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400", 
            "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=400",
            "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=400"
        ],
        specs: [
            { label: "Laboratorio", value: "Laboratorios Oftalmi", icon: "🏢" },
            { label: "Presentación", value: "Solución Oral (120 ml)", icon: "🧪" },
            { label: "Concentración", value: "180mg / 5ml", icon: "📊" },
            { label: "Código ATC", value: "N02BE01", icon: "🧬" }
        ],
        dosageGuide: {
    infant: { 
        label: "Recién nacidos a 3 meses", 
        dosage: "Consulte a su médico / Requiere Prescripción", 
        freq: "La administración en lactantes debe ser estrictamente bajo indicación y supervisión del pediatra tratante." 
    },
    toddler: { 
        label: "Niños de 1 a 2 años", 
        dosage: "Vea el empaque / Consulte al Pediatra", 
        freq: "Siga las instrucciones del reverso de la caja o la receta médica. No automedique." 
    },
    '2to4': { 
        label: "Niños de 2 a 4 años", 
        dosage: "Dosificación según Peso Corporal", 
        freq: "La dosis exacta depende del peso del menor. Verifique la tabla oficial del fabricante en el empaque." 
    },
    '4to6': { 
        label: "Niños de 4 a 6 años", 
        dosage: "Consulte el Prospecto Adjunto", 
        freq: "Utilice la jeringa dosificadora o vaso medidor incluido en el producto. Siga las pautas del facultativo." 
    },
    older: { 
        label: "Niños de 9 a 12 años", 
        dosage: "Sujeto a Indicación Médica", 
        freq: "Si los síntomas (fiebre o dolor) persisten por más de 48 horas, suspenda el uso y acuda a un centro de salud." 
    }
},
        stockLocations: [
            { city: "Caracas - Las Mercedes", status: "high", label: "Disponible" },
            { city: "Caracas - Chacao", status: "medium", label: "Poca Disponibilidad" },
            { city: "Miranda - San Antonio", status: "none", label: "No Disponible" }
        ]
    }
];

const PageProduct = () => {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get("id"); 

    const [selectedImage, setSelectedImage] = useState(0);
    const [ageRange, setAgeRange] = useState('4to6'); 
    const [activeTab, setActiveTab] = useState('warnings'); 

    useEffect(() => {
        setSelectedImage(0);
    }, [productId]);

    // Buscamos el producto dinámicamente. Si no existe o no viene ID, usamos s7 (Apiret) por defecto
    const product = useMemo(() => {
        const found = ALL_PRODUCTS_DB.find(p => p.id === productId);
        if (found) {
            // Aseguramos fallbacks por si los productos de la lista s1-s6 no tienen todas las propiedades extendidas de s7
            return {
                images: found.images || [found.image],
                specs: found.specs || [{ label: "Presentación", value: "Estándar", icon: "🧪" }],
                dosageGuide: found.dosageGuide || ALL_PRODUCTS_DB.find(p => p.id === "s7").dosageGuide,
                stockLocations: found.stockLocations || ALL_PRODUCTS_DB.find(p => p.id === "s7").stockLocations,
                ...found
            };
        }
        // Fallback por defecto si no encuentra el ID
        return ALL_PRODUCTS_DB.find(p => p.id === "s7");
    }, [productId]);

    // Formateador de precios local idéntico al del buscador
    const formatPrice = (value) => {
        return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(value);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-800 antialiased">
                
                {/* 🗺️ Breadcrumbs */}
                <div className="max-w-[1320px] mx-auto px-6 pt-8">
                    <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
                        <a href="/catalog" className="hover:text-blue-600 transition-colors">Salud y Medicamentos</a>
                        <span className="text-slate-300">/</span>
                        <a href="/catalog/pediatrico" className="hover:text-blue-600 transition-colors">Analgésico y Antipirético</a>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900 font-bold truncate max-w-xs">{product.labelText}</span>
                    </nav>
                </div>

                {/* 📦 Dashboard de Producto */}
                <main className="max-w-[1320px] mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* 🛡️ SECCIÓN IZQUIERDA (8 Columnas) */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* Bloque Principal: Presentación y Galería */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                            <div className="absolute top-6 left-6 bg-amber-500 text-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-lg">
                               Aprovecha - 35% OFF
                            </div>

                            {/* Galería */}
                            <div className="flex flex-col items-center justify-center space-y-5">
                                <div className="h-[280px] w-full flex items-center justify-center bg-slate-50 rounded-2xl p-4">
                                    <img 
                                        src={product.images[selectedImage] || product.image} 
                                        alt={product.labelText} 
                                        className="max-h-full max-w-full object-contain transition-all duration-500 ease-out transform hover:scale-105"
                                    />
                                </div>
                                {product.images.length > 1 && (
                                    <div className="flex gap-2">
                                        {product.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                                    selectedImage === index ? 'w-6 bg-slate-800' : 'w-2 bg-slate-200 hover:bg-slate-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Datos Base */}
                            <div className="space-y-4">
                                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                                    {product.brand}
                                </span>
                                <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                    {product.labelText}
                                </h1>
                                <p className="text-xs font-semibold text-slate-400">Composición: <span className="text-slate-700 font-bold">{product.composition || "Acetaminofén"}</span></p>
                                
                                <div className="flex items-center space-x-3 text-xs pt-1">
                                    <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold">
                                        ★ {product.rating}
                                    </div>
                                    <span className="text-slate-400 font-medium">({product.reviews} Valoraciones)</span>
                                </div>

                                <div className="flex flex-wrap gap-1.5 pt-2">
                                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">Uso Terapéutico</span>
                                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">Eficacia Certificada</span>
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Canal Clínico</span>
                                </div>
                            </div>
                        </div>

                        {/* 📊 Bento Grid: Ficha Técnica Estilizada */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {product.specs.map((spec, i) => (
                                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col justify-between min-h-[100px]">
                                    <span className="text-lg bg-slate-50 w-8 h-8 rounded-lg flex items-center justify-center">{spec.icon}</span>
                                    <div className="mt-2">
                                        <p className="text-[10px] font-medium text-slate-400 uppercase">{spec.label}</p>
                                        <p className="text-xs font-bold text-slate-800 truncate">{spec.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 🛠️ Selector Médico de Dosificación Dinámica */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Posología y Tabla de Dosis Orientativa</h3>
                                <p className="text-xs text-slate-400">Filtra según el rango de edad para conocer la administración sugerida.</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-xl">
                                {Object.keys(product.dosageGuide).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setAgeRange(key)}
                                        className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                                            ageRange === key 
                                                ? 'bg-white text-slate-900 shadow-xs border border-slate-100' 
                                                : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                    >
                                        {key === 'infant' ? '0-3 meses' : key === 'toddler' ? '1-2 años' : key === '2to4' ? '2-4 años' : key === '4to6' ? '4-6 años' : '9-12 años'}
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Rango Seleccionado</p>
                                    <p className="text-xs font-extrabold text-slate-900">{product.dosageGuide[ageRange].label}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold">Dosis Recomendada</p>
                                    <p className="text-xs font-black text-blue-900">{product.dosageGuide[ageRange].dosage}</p>
                                    <p className="text-[11px] text-slate-500 font-medium leading-tight">{product.dosageGuide[ageRange].freq}</p>
                                </div>
                            </div>
                        </div>

                        {/* 📄 Pestañas Clínicas */}
                        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
                            <div className="flex border-b border-slate-100 bg-slate-50/50">
                                <button 
                                    onClick={() => setActiveTab('warnings')}
                                    className={`flex-1 py-3.5 text-xs font-bold text-center cursor-pointer transition-colors ${activeTab === 'warnings' ? 'bg-white text-rose-600 border-b-2 border-rose-500' : 'text-slate-500 hover:text-slate-800'}`}
                                >
                                    ⚠️ Advertencias
                                </button>
                                <button 
                                    onClick={() => setActiveTab('mechanism')}
                                    className={`flex-1 py-3.5 text-xs font-bold text-center cursor-pointer transition-colors ${activeTab === 'mechanism' ? 'bg-white text-blue-600 border-b-2 border-blue-500' : 'text-slate-500 hover:text-slate-800'}`}
                                >
                                    🧠 Mecanismo de Acción
                                </button>
                                <button 
                                    onClick={() => setActiveTab('contra')}
                                    className={`flex-1 py-3.5 text-xs font-bold text-center cursor-pointer transition-colors ${activeTab === 'contra' ? 'bg-white text-slate-900 border-b-2 border-slate-800' : 'text-slate-500 hover:text-slate-800'}`}
                                >
                                    🚫 Contraindicaciones
                                </button>
                            </div>
                            <div className="p-6 text-xs text-slate-600 leading-relaxed font-medium">
                                {activeTab === 'warnings' && (
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est mollitia, quo, reprehenderit asperiores perferendis in quia consequuntur temporibus alias quis delectus tempore nihil, aliquid iste incidunt exercitationem inventore laudantium nulla.</p>
                                )}
                                {activeTab === 'mechanism' && (
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae excepturi repellendus accusamus nam officia alias quas voluptatum autem distinctio. Similique quidem vitae laborum molestias cum, cumque dolores pariatur accusamus minima.</p>
                                )}
                                {activeTab === 'contra' && (
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore qui nulla provident accusamus perferendis! Beatae eum error perspiciatis, sint minus quam necessitatibus dolor qui officia velit, est totam laudantium provident.</p>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* 💳 SECCIÓN DERECHA (4 Columnas) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-4">
                        
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 space-y-6">
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Precio Final de Venta</p>
                                <div className="flex items-baseline justify-between">
                                    <span className="text-3xl font-black text-slate-900 tracking-tight">Bs. {formatPrice(product.price)}</span>
                                    {product.oldPrice && <span className="text-xs font-bold text-slate-400 line-through">Bs. {formatPrice(product.oldPrice)}</span>}
                                </div>
                                <div className="text-[11px] font-bold text-slate-400">
                                    Envío gestionado de inmediato por delivery express.
                                </div>
                            </div>

                            <button className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-98 cursor-pointer shadow-md">
                                Agregar al Carrito
                            </button>

                            <div className="pt-4 border-t border-slate-100 space-y-3 text-xs font-bold">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400 font-semibold">🛵 Entrega Estimada:</span>
                                    <span className="text-slate-900 font-extrabold">En {product.deliveryTime}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400 font-semibold">🔒 Canal Seguro:</span>
                                    <span className="text-emerald-600 font-extrabold">Ficha Certificada</span>
                                </div>
                            </div>
                        </div>

                        {/* Disponibilidad en Tiendas */}
                        <div className="bg-white rounded-3xl p-5 border border-slate-100 space-y-3">
                            <h4 className="text-xs font-bold text-slate-900">Disponibilidad de Red Local</h4>
                            <div className="space-y-2">
                                {product.stockLocations.map((loc, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                                        <span className="text-slate-600 font-medium">{loc.city}</span>
                                        <div className="flex items-center space-x-1.5">
                                            <span className={`w-2 h-2 rounded-full ${
                                                loc.status === 'high' ? 'bg-emerald-500' : loc.status === 'medium' ? 'bg-amber-500' : 'bg-rose-500'
                                            }`} />
                                            <span className="text-[11px] font-bold text-slate-700">{loc.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </main>
            </div>
        </Layout>
    );
};

export default PageProduct;