// src/services/tokenService.mjs
import jwt from "jsonwebtoken";

// Clave secreta para firmar los tokens (Usa tu variable de entorno o una por defecto)
const SECRET_KEY = process.env.KEY_JWT || "PHARMACIA";

// Configuración de seguridad estándar para las Cookies de sesión
const COOKIE_OPTIONS = {
    httpOnly: true,     // 🔐 Evita que JavaScript del frontend (XSS) acceda a la cookie
    secure: false,      // 🛑 En desarrollo (localhost) se pone en false. En producción (HTTPS) debe ser true
    sameSite: "lax",    // Permite que la cookie viaje correctamente entre localhost:5173 y localhost:3000
    maxAge: 2 * 60 * 60 * 1000 // ⏳ Duración de la cookie: 2 horas en milisegundos
};

/**
 * 🍪 Crea el JWT y lo inyecta directamente en las cookies de la respuesta HTTP
 * @param {Object} res - El objeto 'res' de Express
 * @param {Object} payload - Los datos del usuario que queremos guardar dentro del token (idUsuario, usuario, rolId)
 */
export const handleSessionCookie = (res, payload) => {
    // Firmamos el token con los datos y le damos 2 horas de vida útil
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    
    // Guardamos el token en una cookie llamada 'token'
    res.cookie("token", token, COOKIE_OPTIONS);
};

/**
 * 🔍 Verifica el estado exacto de un token JWT
 * @param {string} token - El string del token extraído de la cookie
 * @returns {Object} Un objeto con el estado detallado { valid, expired, decoded }
 */
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return { valid: true, expired: false, decoded };
    } catch (error) {
        return {
            valid: false,
            // Retorna true solo si el error de jsonwebtoken dice específicamente que el tiempo expiró
            expired: error.name === "TokenExpiredError",
            decoded: null
        };
    }
};

/**
 * 🧹 Borra la cookie de sesión del navegador (Para el proceso de Logout)
 * @param {Object} res - El objeto 'res' de Express
 */
export const clearSessionCookie = (res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
};