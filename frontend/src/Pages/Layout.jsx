import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Label } from '@heroui/react'

const Layout = ({ children }) => {


    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const megaMenuRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Buscando producto o medicamento:", searchQuery);
        // Aquí puedes redirigir a la página de resultados, ej: navigate(`/buscar?q=${searchQuery}`)
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

    // Función para alternar el menú deteniendo la propagación del clic 🎯
    const toggleMegaMenu = (e) => {
        e.stopPropagation();
        setIsMegaMenuOpen(!isMegaMenuOpen);
    };
    return (
        <div className="h-screen overflow-auto">
            <header className="sticky top-0 z-50 shadow-md">
                <div className='flex bg-[#ffff] p-2 justify-between w-full'>

                    {/* 1. LOGO Y PAÍS (Mantenemos tu enlace y agregamos la bandera al lado) */}
                    <div className="flex  space-x-4 shrink-0">
                        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900">FARMAPATRIA</span>
                        </a>
                    </div>

                    <div className="flex justify-end gap-10 w-full">

                        {/* 🔍 BARRA DE BÚSQUEDA AVANZADA (Modificada para incluir Categorías, Flecha y Lupa Azul) */}
                        <form className="w-full max-w-xl ">
                            <div className="flex items-center h-10 w-full border border-blue-400 rounded-full bg-[#f4f4f6] overflow-hidden focus-within:ring-2 focus-within:ring-blue-200 transition-all">

                                {/* Agregado: Botón interno de Categorías */}
                                <button
                                    type="button"
                                    className="h-full px-4 text-xs font-medium text-gray-500 bg-[#ebedf0] hover:bg-gray-200 flex items-center space-x-1 border-r border-gray-200 transition-colors focus:outline-none"
                                >
                                    <span>Categorías</span>
                                </button>

                                {/* Contenedor del Input con la flechita azul agregada */}
                                <div className="flex-1 h-full relative flex items-center bg-white">
                                    <div className="absolute left-3 pointer-events-none flex items-center">
                                        <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.999 17.17l-6.59-6.59 1.41-1.42 5.18 5.17 5.18-5.17 1.41 1.42z" />
                                        </svg>
                                    </div>

                                    <input
                                        type="search"
                                        placeholder="Busca aquí tu producto"
                                        className="w-full h-full pl-7 pr-4 text-sm text-gray-700 placeholder-blue-600 font-normal focus:outline-none"
                                    />
                                </div>

                                {/* Agregado: Botón de Lupa Azul integrado a la derecha */}
                                <button
                                    type="submit"
                                    className="h-full px-6 bg-[#4086f4] hover:bg-blue-600 text-white flex items-center justify-center transition-colors focus:outline-none rounded-r-full"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602z" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        {/* ⚙️ SECCIÓN DE ENLACES (Reemplazados por: Inicia sesión, Caracas y Carrito Limpio) */}
                        <div className="flex gap-5 text-blue-500 font-medium text-sm shrink-0">

                            {/* Inicia sesión */}
                            <a href="/login" className="flex items-center space-x-1.5 cursor-pointer hover:text-blue-700 transition-colors whitespace-nowrap">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <span>Inicia sesión</span>
                            </a>

                            {/* Ubicación: Caracas */}
                            <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-700 transition-colors whitespace-nowrap">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
                                </svg>
                                <span>Caracas</span>
                            </div>

                            {/* Carrito de compras limpio sin fondo */}
                            <button className="text-blue-500 hover:text-blue-700 transition-colors px-2 focus:outline-none relative">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    {/* Nueva ruta vectorial limpia con la orientación correcta a la derecha */}
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l3.6 7.59a1 1 0 0 0 .93.63h8.3a1 1 0 0 0 .96-.7l1.45-6a1 1 0 0 0-1.04-1.22H11" />
                                    <circle cx="8.5" cy="19.5" r="1.5" />
                                    <circle cx="17.5" cy="19.5" r="1.5" />
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>


            </header>
            <nav className='bg-[#00a2e8] border-b border-gray-200 md:block'>
                <div className="max-w-screen-xl px-4 py-1 mx-auto relative">
                    <div className="flex items-center">
                        <ul className="flex flex-col w-full md:flex-row font-medium mt-0 md:space-x-8 space-y-2 md:space-y-0 rtl:space-x-reverse text-sm text-gray-700">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => `block py-1 transition-colors duration-200 ${isActive
                                        ? "text-[#ffff] font-semibold"
                                        : "text-blue-500 hover:text-white hover:underline"
                                        }`}
                                >
                                    Home
                                </NavLink>
                            </li>

                            {/* 📂 ELEMENTO DEL MEGA MENÚ */}
                            <li className="relative" ref={megaMenuRef}>
                                <button
                                    onClick={toggleMegaMenu} // Usa la función corregida aquí 🎯
                                    type="button"
                                    className={`flex items-center justify-between w-full py-1 font-medium transition-colors duration-200 focus:outline-none ${isMegaMenuOpen ? "text-[#ffff] font-semibold"
                                        : "text-blue-500 hover:text-white hover:underline"}`}
                                >
                                    Company
                                    <svg className={`w-4 h-4 ms-1.5 transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180 text-white" : "text-blue-200"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Desplegable del Mega Menú */}
                                {isMegaMenuOpen && (
                                    <div className="absolute left-0 mt-3 z-50 grid w-full grid-cols-1 gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-xl md:w-[600px] sm:grid-cols-2 md:grid-cols-3">
                                        <div>
                                            <ul className="space-y-3 font-normal text-gray-600">
                                                <li>
                                                    <NavLink
                                                        to="/home"
                                                        onClick={() => setIsMegaMenuOpen(false)} // Se cierra al hacer clic 🎯
                                                        className={({ isActive }) => `block py-1 transition-colors duration-200 ${isActive ? "text-[#0066cc] font-semibold" : "text-gray-600 hover:text-[#0066cc]"}`}
                                                    >
                                                        Home Overview
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/library"
                                                        onClick={() => setIsMegaMenuOpen(false)} // Se cierra al hacer clic 🎯
                                                        className={({ isActive }) => `inline-flex items-center w-full transition-colors duration-200 ${isActive ? "text-[#0066cc] font-semibold" : "text-gray-600 hover:text-[#0066cc]"}`}
                                                    >
                                                        <svg className="w-4 h-4 me-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023" /></svg>
                                                        Library
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/resources"
                                                        onClick={() => setIsMegaMenuOpen(false)} // Se cierra al hacer clic 🎯
                                                        className={({ isActive }) => `inline-flex items-center w-full transition-colors duration-200 ${isActive ? "text-[#0066cc] font-semibold" : "text-gray-600 hover:text-[#0066cc]"}`}
                                                    >
                                                        <svg className="w-4 h-4 me-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11H4m15.5 5a.5.5 0 0 0 .5-.5V8a1 1 0 0 0-1-1h-3.75a1 1 0 0 1-.829-.44l-1.436-2.12a1 1 0 0 0-.828-.44H8a1 1 0 0 0-1 1M4 9v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-3.75a1 1 0 0 1-.829-.44L9.985 8.44A1 1 0 0 0 9.157 8H5a1 1 0 0 0-1 1Z" /></svg>
                                                        Resources
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Aplica el onClick={() => setIsMegaMenuOpen(false)} en los NavLinks de las demás columnas también */}
                                    </div>
                                )}
                            </li>

                            <li>
                                <NavLink
                                    to="/team"
                                    className={({ isActive }) => `block py-1 transition-colors duration-200 ${isActive
                                        ? "text-[#ffff] font-semibold"
                                        : "text-blue-500 hover:text-white hover:underline"
                                        }`}
                                >
                                    Team
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/features"
                                    className={({ isActive }) => `block py-1 transition-colors duration-200 ${isActive
                                        ? "text-[#ffff] font-semibold"
                                        : "text-blue-500 hover:text-white hover:underline"
                                        }`}
                                >
                                    Features
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className='flex p-2 w-full divide-x-3 bg-[#d9dbe0]'>
                {children}

            </section>
        </div>

    )
}

export default Layout
