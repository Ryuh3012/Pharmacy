import jwt from 'jsonwebtoken';

import { tokenJWT } from '../config/config.mjs';

import { findOneByAuth } from "../models/auth.mjs";

export const singIn = async (req, res) => {
    const { userName, password } = req.body;

    try {

        const usuario = await findOneByAuth(userName);

        if (!usuario) {
            return res.status(400).json({ message: "Usuario o contraseña incorrecta" });
        }

        if (usuario.password !== password) {
            return res.status(400).json({ message: "Usuario o contraseña incorrecta" });
        }

        const payload = {
            id: usuario._id,
            rol: usuario.rol
        };

        const token = jwt.sign(payload, 'TU_FIRMA_SECRETA_DEL_SERVIDOR', { expiresIn: '1d' });

        res.cookie('mi_cookie_session', token, {
            httpOnly: true,
            secure: false, // Mantenlo en false en localhost (desarrollo)
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });

        return res.json({
            message: "Login exitoso",
            user: {
                nameUser: usuario.nameUser,
                rol: usuario.rol,
                nombre: usuario.peopleid ? usuario.peopleid.name : null // Mapea el nombre populado
            }
        });

    } catch (error) {
        console.error("Error en el controlador de inicio de sesión:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};