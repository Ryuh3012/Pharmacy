// src/middlewares/authMiddleware.mjs

import { verifyToken } from "../services/tokenService.mjs";




/**
 * 1. Middleware para verificar que el JWT dentro de la COOKIE esté activo
 */
export const verifyTokenMiddleware = async (req, res, next) => {
    // 🍪 Leemos el token directamente desde las cookies fijadas por el navegador
    const token = req.cookies?.token;

    // Si no hay cookie con el token, acceso denegado de una
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay sesión activa.' });
    }

    // Usamos tu helper de verificación del servicio
    const { valid, expired, decoded } = verifyToken(token);

    if (expired) {
        return res.status(401).json({ message: 'Token expirado. Cierre de sesión requerido.' });
    }

    if (!valid) {
        return res.status(401).json({ message: 'Acceso denegado. Token inválido.' });
    }

    // Si todo está perfecto, inyectamos los datos del usuario en el objeto 'req'
    req.idUsuario = decoded.idUsuario;
    req.usuario = decoded.usuario;
    req.rolId = decoded.rolId; // El ID del rol para los siguientes middlewares
    
    next();
};

/**
 * 2. Middleware exclusivo para Administrador General (Rol ID: 1)
 */
export const verifyAdmin = async (req, res, next) => {
    if (req.rolId !== 1) {
        return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso.' });
    }
    next();
};

/**
 * 3. Middleware mixto (Admin = 1 o Cajero = 2)
 */
export const verifyUser = async (req, res, next) => {
    if (req.rolId === 1 || req.rolId === 2) {
        return next();
    }
    return res.status(403).json({ message: 'Uso exclusivo para administrador o personal de caja.' });
};