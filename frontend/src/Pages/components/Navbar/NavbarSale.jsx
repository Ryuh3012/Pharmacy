import React, { useState } from 'react';
import { Search, Bell, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../../../Hooks/useAuth';

const NavbarSale = ({ children, title = 'Admin' }) => {
    const { usuario, estaAutenticado, cargando } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const cerrarSesion = async () => {
        try {
            // Endpoint recomendado en backend (si no existe, igual limpiamos cookies del navegador localmente)
            await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: 'include',
            }).catch(() => null);
        } finally {
            // Limpieza local: importante si el logout del backend no elimina la cookie httpOnly.
            // (No podemos borrar httpOnly desde JS, pero sí forzamos reintento/estado y redirección)
            document.cookie = 'token=; Max-Age=0; path=/';
            window.location.href = '/login';
        }
    };

    const nombreCompleto = usuario?.nombre || usuario?.usuario?.nombre || usuario?.name || 'Admin';

    return (
        <div className="flex bg-gray-50">
            <div className="flex-1 flex flex-col">
                <header className="h-15 bg-white border-b border-gray-100 flex items-center justify-between px-8">
                    <div>
                        <p className="text-xs text-gray-400">Welcome,</p>
                        <h3 className="font-bold text-slate-800">{title}</h3>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search anything"
                                className="w-full pl-10 py-2 bg-gray-50 rounded-xl text-sm outline-none"
                            />
                        </div>

                        <Bell size={20} className="text-gray-400" />

                        <div className="flex items-center gap-2 border-l pl-6 relative">
                            <div className="w-8 h-8 rounded-full bg-gray-200" />
                            <button
                                type="button"
                                className="flex items-center gap-2"
                                onClick={() => setMenuOpen((v) => !v)}
                                disabled={cargando}
                            >
                                <span className="font-semibold text-sm">{estaAutenticado ? nombreCompleto : '—'}</span>
                                <ChevronDown size={16} />
                            </button>

                            {menuOpen && estaAutenticado && (
                                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 shadow-lg rounded-2xl p-2 w-44 z-50">
                                    <button
                                        type="button"
                                        onClick={cerrarSesion}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl font-semibold"
                                    >
                                        <LogOut size={16} />
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>



                {children}
            </div>
        </div>
    );
};

export default NavbarSale;

