// src/controllers/authController.mjs
import bcrypt from "bcrypt";
// Importamos tu modelo (Asegúrate de haber elegido la Opción 1 de renombrarlo a authModel.mjs)

// Importamos el servicio para gestionar la cookie de sesión

import { findOneByAuthModel } from "../models/authModel.mjs";
import { handleSessionCookie } from "../services/tokenService.mjs";

export const singIn = async (req, res) => {
    try {
        const { userName, password } = req?.body;
        // 1. Validar que el frontend envíe ambos campos obligatorios
        if (!userName || !password) {
            return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
        }

        // 2. Buscar si el usuario existe en la base de datos usando el modelo de Prisma
        const usuarioEncontrado = await findOneByAuthModel(userName);
        if (!usuarioEncontrado) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        const passwordCorrecto = await bcrypt.compare(password, usuarioEncontrado.password);
        console.log(passwordCorrecto)
        if (!passwordCorrecto) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        // 4. 🍪 Generar el JWT y fijar la Cookie httpOnly en la respuesta (res)
        // Guardamos el idUsuario, el nombre de usuario y el ID numérico del rol (rolId)
        handleSessionCookie(res, {
            idUsuario: usuarioEncontrado.idUsuario,
            usuario: usuarioEncontrado.usuario,
            rolId: usuarioEncontrado.rolId
        });

        // 5. Responder con éxito al frontend mandando los datos del usuario para su estado global
        return res.status(200).json({
            message: "¡Inicio de sesión exitoso! 🚀",
            user: {
                id: usuarioEncontrado.idUsuario,
                usuario: usuarioEncontrado.usuario,
                nombre: usuarioEncontrado.persona.nombrePersona,
                apellido: usuarioEncontrado.persona.apellidoPersona,
                rol: usuarioEncontrado.rol.roles // Envía el string ("Admin", "Cajero") para la interfaz
            }
        });

    } catch (error) {
        console.error("Error en el singIn Controller:", error);
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};