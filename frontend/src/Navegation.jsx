import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import LoginAuth from './Pages/auth/Login/LoginAuth';

import PageCatalog from './Pages/clients/catalog/PageCatalog';
import PageSearch from './Pages/clients/search/PageSearch';
import PageProduct from './Pages/clients/product/PageProduct';
import Dashboard from './Pages/admin/Dashboard/Dashboard';
import Sale from './Pages/admin/sales/Sale';

const Navegation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PageCatalog />} />


                <Route path='/search' element={<PageSearch />} />

                <Route path='/producto/:id' element={<PageProduct />} />

                <Route path='/login' element={<LoginAuth />} />

                {/* Vistas de Personal */}
                <Route path='/admin' element={<Dashboard />} />
                <Route path='/venta' element={<Sale />} />

                <Route path="*" element={<Navigate to={'/'} replace={true} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Navegation;