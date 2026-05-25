import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import LoginAuth from './Pages/auth/Login/LoginAuth'

// 👇 IMPORTANTE: Aquí irás importando tus nuevas páginas a medida que las crees
// import CatalogoPublico from './Pages/client/CatalogoPublico'
// import AdminDashboard from './Pages/admin/AdminDashboard'
// import CajaPOS from './Pages/vendedor/CajaPOS'

const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 🌐 FASE 1: El usuario de la calle (Estilo Farmatodo) */}
                {/* Cambiamos temporalmente el componente por un texto hasta que crees tu CatalogoPublico */}
                <Route path='/' element={<div>Bienvenido al Catálogo Público (Buscador, Mapa y Precios)</div>} />

                {/* 🔑 EL MÓDULO DE ACCESO (Tu Login actual) */}
                {/* Movemos tu LoginAuth aquí para que la página pública cargue al instante sin bloqueos */}
                <Route path='/login' element={<LoginAuth />} />

                {/* 📊 FASE 2: El Administrador / Moderador */}
                <Route path='/admin' element={<div>Panel de Control del Administrador (Estadísticas e Inventario)</div>} />

                {/* 🛒 FASE 3: El Vendedor */}
                <Route path='/caja' element={<div>Sistema de Caja / POS (Facturación rápida)</div>} />

                {/* 🛡️ RUTA COMODÍN: Si escriben cualquier tontería en la URL, los manda al inicio público */}
                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Navegation