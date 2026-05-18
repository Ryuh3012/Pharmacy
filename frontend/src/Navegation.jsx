import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import LoginAuth from './Pages/auth/Login/LoginAuth'


const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LoginAuth />} path='/' />
                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Navegation
