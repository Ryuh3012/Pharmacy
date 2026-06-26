// src/Router/routerAuth.mjs
import { Router } from "express";
import { singIn } from "../controllers/authController.mjs";
import { verifyAdmin, verifyTokenMiddleware } from "../middlewares/authMiddleware.mjs";





const router = Router();

/**
 * 🔐 Ruta pública: Inicio de sesión
 * POST http://localhost:3000/auth/login
 */
router.post("/auth", singIn);

/**
 * 🔄 Ruta protegida: Verificar estado de la sesión actual
 * GET http://localhost:3000/auth/validate
 * * Explicación del flujo:
 * 1. Pasa por 'verifyTokenMiddleware' para leer la cookie y validar el JWT.
 * 2. Si todo está bien, responde al frontend confirmando que la sesión sigue viva.
 */
router.get("/auth/validate", verifyTokenMiddleware, (req, res) => {
    return res.status(200).json({
        active: true,
        message: "Sesión activa y válida ✅",
        user: {
            idUsuario: req.idUsuario,
            usuario: req.usuario,
            rolId: req.rolId
        }
    });
});

/**
 * 🛡️ Ruta de prueba para Rol (Opcional - solo para probar en Postman/Frontend)
 * GET http://localhost:3000/auth/admin-dashboard
 */
router.get("/admin-dashboard", verifyTokenMiddleware, verifyAdmin, (req, res) => {
    return res.status(200).json({
        message: "¡Bienvenido al panel de control de Administrador General! 👑"
    });
});



export default router;