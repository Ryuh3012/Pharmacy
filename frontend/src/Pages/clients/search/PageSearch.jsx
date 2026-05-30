import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router'; 
import Layout from '../../Layout';

const ALL_PRODUCTS_DB = [
    { id: "s1", category: "Medicamentos", discountTag: "15%", labelText: "Acetaminofen 650mg 10tabletas Genven", brand: "Leti", price: 293.25, oldPrice: 345.00, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400", deliveryTime: "35 mins", rating: "4.9", reviews: "195", descriptionTag: "Solo DELIVERY - 15% Dcto" },
    { id: "s2", category: "Medicamentos", discountTag: "15%", labelText: "Paracetamol 1g/100ml Jl Pharma Solución Inyectable Intravenoso", brand: "JL Pharma", price: 3633.75, oldPrice: 4275.00, image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=400", deliveryTime: "35 mins", rating: "5.0", reviews: "2", descriptionTag: "Solo DELIVERY - 15% Dcto" },
    { id: "s3", category: "Medicamentos", discountTag: "15%", labelText: "Paracetamol 1g 100ml comprimidos", brand: "Distrilab", price: 3113.24, oldPrice: 3662.63, image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=400", deliveryTime: "35 mins", rating: "5.0", reviews: "1", descriptionTag: "Solo DELIVERY - 15% Dcto", hasRecipeIcon: true },
    { id: "s4", category: "Dolor General", discountTag: "15%", labelText: "Atamel Forte 650mg 10 Tabletas", brand: "Calox", price: 185.50, oldPrice: 218.23, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400", deliveryTime: "35 mins", rating: "4.8", reviews: "94", descriptionTag: "Solo DELIVERY - 15% Dcto" },
    { id: "s5", category: "Salud Respiratoria y Gripe", discountTag: "15%", labelText: "Fin-Al-Grip Antigripal Noche", brand: "Elmor", price: 320.00, oldPrice: 376.40, image: "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?q=80&w=400", deliveryTime: "35 mins", rating: "4.7", reviews: "42", descriptionTag: "Solo DELIVERY - 15% Dcto" },
    { id: "s6", category: "Dolor General", discountTag: "15%", labelText: "Acetaminofen Lusa 650mg 10 Tabletas", brand: "La Sante", price: 210.15, oldPrice: 247.23, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400", deliveryTime: "35 mins", rating: "4.9", reviews: "11", descriptionTag: "Solo DELIVERY - 15% Dcto" },
];

const FILTER_CATEGORIES = [
    { name: "Dolor General", key: "Dolor General" },
    { name: "Medicamentos", key: "Medicamentos" },
    { name: "Salud Respiratoria y Gripe", key: "Salud Respiratoria y Gripe" },
];

const FILTER_BRANDS = ["Leti", "JL Pharma", "Distrilab", "Calox", "Elmor", "La Sante"];

const PageSearch = () => {
    const navigate = useNavigate(); 
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || ""; 

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const handleCategoryChange = (key) => {
        setSelectedCategories(prev => 
            prev.includes(key) ? prev.filter(c => c !== key) : [...prev, key]
        );
    };

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleClearAll = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
    };

    const filteredProducts = useMemo(() => {
        return ALL_PRODUCTS_DB.filter(product => {
            const matchesQuery = searchQuery === "" || 
                product.labelText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategories.length === 0 || 
                selectedCategories.includes(product.category);

            const matchesBrand = selectedBrands.length === 0 || 
                selectedBrands.includes(product.brand);

            return matchesQuery && matchesCategory && matchesBrand;
        });
    }, [searchQuery, selectedCategories, selectedBrands]);

    const formatPrice = (value) => {
        return `Bs. ${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2 }).format(value)}`;
    };

    // 🎯 Navegación por ID al detalle del producto
    const handleProductClick = (id) => {
        navigate(`/producto/${id}`);
    };

    return (
        <Layout>
            <div className="w-full bg-[#F8FAFC] min-h-screen p-6 antialiased text-slate-800">
                <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row gap-8">
                    
                    {/* Filtros */}
                    <aside className="w-full md:w-[280px] shrink-0 bg-white rounded-2xl p-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.02)] border border-slate-100 h-fit">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                            <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Filtrar por</h3>
                            {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
                                <button onClick={handleClearAll} className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
                                    Limpiar filtros
                                </button>
                            )}
                        </div>

                        <div className="mb-6">
                            <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-widest mb-3">Categorías</h4>
                            <div className="flex flex-col gap-2.5">
                                {FILTER_CATEGORIES.map((cat, i) => (
                                    <label key={i} className="flex items-center gap-3 text-xs text-slate-600 cursor-pointer select-none group">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedCategories.includes(cat.key)}
                                            onChange={() => handleCategoryChange(cat.key)}
                                            className="w-4 h-4 rounded border-slate-200 text-slate-900 focus:ring-0 cursor-pointer accent-slate-900" 
                                        />
                                        <span className={`transition-colors group-hover:text-slate-900 ${selectedCategories.includes(cat.key) ? "font-bold text-slate-900" : "font-medium"}`}>
                                            {cat.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-widest mb-3">Marcas</h4>
                            <div className="flex flex-col gap-2.5">
                                {FILTER_BRANDS.map((brand, i) => (
                                    <label key={i} className="flex items-center gap-3 text-xs text-slate-600 cursor-pointer select-none group">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => handleBrandChange(brand)}
                                            className="w-4 h-4 rounded border-slate-200 text-slate-900 focus:ring-0 cursor-pointer accent-slate-900" 
                                        />
                                        <span className={`transition-colors group-hover:text-slate-900 ${selectedBrands.includes(brand) ? "font-bold text-slate-900" : "font-medium"}`}>
                                            {brand}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Resultados */}
                    <main className="flex-1">
                        <div className="mb-6">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">
                                {searchQuery ? (
                                    <>Resultados para <span className="text-blue-600">"{searchQuery}"</span></>
                                ) : (
                                    "Catálogo general de salud"
                                )}
                            </h1>
                            <p className="text-xs text-slate-400 font-semibold mt-0.5">{filteredProducts.length} artículos encontrados</p>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 p-8 shadow-xs">
                                <span className="text-4xl block mb-3">🔍</span>
                                <h3 className="text-sm font-bold text-slate-800">No hay conexiones exactas</h3>
                                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">Ajusta los parámetros de búsqueda en los paneles laterales o verifica que los nombres estén bien escritos.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredProducts.map((product) => (
                                    <div 
                                        key={product.id} 
                                        onClick={() => handleProductClick(product.id)}
                                        className="bg-white border border-slate-100/80 rounded-2xl p-5 flex flex-col justify-between relative shadow-[0_4px_20px_-10px_rgba(0,0,0,0.01)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer"
                                    >
                                        {/* Tag Descuento */}
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="bg-rose-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider">
                                                {product.discountTag} OFF
                                            </span>
                                        </div>

                                        {/* Botonera Superior Derecha */}
                                        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                                            {product.hasRecipeIcon && (
                                                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-xs border border-amber-100 font-bold">
                                                    Rx
                                                </div>
                                            )}
                                            <button 
                                                onClick={(e) => {
                                                    // 🛑 Detiene la propagación para que el clic al "+" no active el handleProductClick de la tarjeta
                                                    e.stopPropagation();
                                                    alert(`Añadido al carrito: ${product.id}`);
                                                }}
                                                className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-sm hover:bg-slate-800 transition-colors cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Visualizador Imagen */}
                                        <div className="w-full h-36 flex items-center justify-center my-4 rounded-xl bg-slate-50/50 p-2">
                                            <img src={product.image} alt={product.labelText} className="max-h-full max-w-[85%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out" />
                                        </div>

                                        {/* Detalles Métricos y Textos */}
                                        <div className="flex flex-col gap-1 mt-auto">
                                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{product.brand}</span>
                                            <h2 className="text-xs font-bold text-slate-800 line-clamp-2 min-h-[36px] leading-snug tracking-tight">{product.labelText}</h2>
                                            
                                            <div className="flex items-baseline gap-2 mt-2">
                                                <span className="text-base font-black text-slate-900 tracking-tight">{formatPrice(product.price)}</span>
                                                {product.oldPrice && <span className="text-xs text-slate-400 line-through font-medium">{formatPrice(product.oldPrice)}</span>}
                                            </div>

                                            <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-3 text-[10px] text-slate-400 font-bold">
                                                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md text-slate-600">
                                                    <span>🛵</span><span>{product.deliveryTime}</span>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <span className="text-amber-500 text-xs">★</span><span className="text-slate-700 font-extrabold">{product.rating}</span><span className="font-medium text-slate-400">({product.reviews})</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </Layout>
    );
};

export default PageSearch;