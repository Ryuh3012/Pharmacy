import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import LoginAuth from './Pages/auth/Login/LoginAuth'
import PageCatalog from './Pages/clients/catalog/PageCatalog'

const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path='/' element={<PageCatalog />} />

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