import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const megaMenuRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        {/* CORREGIDO: Cambiado de '/seach' a '/search' para que coincida con tus rutas */ }
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
                setIsMegaMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMegaMenu = (e) => {
        e.stopPropagation();
        setIsMegaMenuOpen(!isMegaMenuOpen);
    };

    return (
        <div className="h-screen overflow-auto bg-[#F8FAFC]">
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.03)]">
                <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-8">

                    <div className="flex shrink-0">
                        <a href="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-5 w-5 brightness-0 invert" alt="Logo" />
                            </div>
                            <span className="self-center text-xl font-black tracking-tight text-slate-900 font-sans">
                                PHARMACY
                                {/* <span className="text-blue-600 font-extrabold">FARMA</span> */}
                            </span>
                        </a>
                    </div>

                    <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl">
                        <div className="relative flex items-center h-11 w-full bg-slate-100/70 border border-transparent rounded-2xl px-2.5 gap-2 transition-all duration-300 focus-within:bg-white focus-within:border-blue-500/30 focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-within:ring-4 focus-within:ring-blue-50 group">

                            <div className="pl-2 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602z" />
                                </svg>
                            </div>

                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Encuentra lo que necesitas..."
                                className="flex-1 h-full bg-transparent text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none tracking-tight"
                            />

                            <button
                                type="submit"
                                className="h-8 px-4 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm opacity-0 scale-95 group-focus-within:opacity-100 group-focus-within:scale-100 transition-all duration-200 cursor-pointer"
                            >
                                <span>Buscar</span>
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center gap-2 lg:gap-5 shrink-0">
                        <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-slate-400 font-normal">Sede:</span>
                            <span>Caracas</span>
                        </div>

                        <a href="/login" className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 font-bold text-xs uppercase tracking-wider transition-colors px-3 py-2 rounded-xl hover:bg-slate-50">
                            <svg className="w-4 h-4 text-slate-500 group-hover:text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                            <span className="hidden md:inline">Entrar</span>
                        </a>

                        <button className="relative p-2.5 text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 rounded-xl transition-all focus:outline-none cursor-pointer group">
                            <svg className="w-5 h-5 transition-transform group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.116 60.116 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            <span className="absolute top-1 right-1 bg-blue-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                0
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <nav className="bg-slate-900 text-white shadow-md hidden md:block">
                <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 relative">
                    <div className="flex items-center h-11">
                        <ul className="flex items-center space-x-8 font-bold text-xs tracking-wider uppercase">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => `py-3 block border-b-2 transition-all duration-150 ${isActive ? "border-blue-500 text-blue-400" : "border-transparent text-slate-300 hover:text-white"}`}
                                >
                                    Inicio
                                </NavLink>
                            </li>
                            <li className="relative" ref={megaMenuRef}>
                                <button
                                    onClick={toggleMegaMenu}
                                    type="button"
                                    className={`flex items-center justify-between py-3 border-b-2 font-bold uppercase tracking-wider transition-all focus:outline-none cursor-pointer ${isMegaMenuOpen ? "border-blue-500 text-blue-400" : "border-transparent text-slate-300 hover:text-white"}`}
                                >
                                    <span>Compañía</span>
                                    <svg className={`w-3.5 h-3.5 ms-1.5 transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180 text-blue-400" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>

                                {isMegaMenuOpen && (
                                    <div className="absolute left-0 mt-1 z-50 w-64 p-2 bg-white border border-slate-100 rounded-xl shadow-xl">
                                        <ul>
                                            <li>
                                                <NavLink
                                                    to="/home"
                                                    onClick={() => setIsMegaMenuOpen(false)}
                                                    className="block px-4 py-2.5 text-sm normal-case font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                                                >
                                                    Sobre Nosotros
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="w-full">
                {children}
            </main>
        </div>
    );
};

export default Layout;