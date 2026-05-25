import jwt from 'jsonwebtoken';

import { tokenJWT } from '../config/config.mjs';

import { findOneByAuth } from "../models/auth.mjs";

export const singIn = async (req, res) => {
    const { userName, password } = req.body;

    try {
        // 1. Usamos TU función del módulo para buscar al usuario
        // Esta función ya tiene el .populate('peopleid') y el .lean() adentro 😎
        const usuario = await findOneByAuth(userName);

        // Si el usuario no existe (tu función devuelve null si no lo encuentra)
        if (!usuario) {
            return res.status(400).json({ message: "Usuario o contraseña incorrecta" });
        }

        // 2. Verificamos si la contraseña coincide
        if (usuario.password !== password) {
            return res.status(400).json({ message: "Usuario o contraseña incorrecta" });
        }

        // 3. Generamos el Payload del JWT
        const payload = {
            id: usuario._id,
            rol: usuario.rol
        };

        // Firmamos el token
        const token = jwt.sign(payload, 'TU_FIRMA_SECRETA_DEL_SERVIDOR', { expiresIn: '1d' });

        // 4. Inyectamos la cookie HttpOnly al navegador
        res.cookie('mi_cookie_session', token, {
            httpOnly: true,
            secure: false, // Mantenlo en false en localhost (desarrollo)
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });

        // 5. Respondemos al frontend con los datos que necesita para HeroUI y Formik
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