// src/routes/saleRouter.mjs
import { Router } from "express";
import { registrarVentaController } from "../controllers/saleController.mjs";
// Importamos el controlador correspondiente


const router = Router();

/**
 * @route   POST /api/sales
 * @desc    Registrar una nueva venta desde el POS (Factura, Detalles, Pagos y Descuento de Inventario)
 * @access  Privado (Cajero / Admin)
 */
router.post("/api/sales", registrarVentaController);

// Si en el futuro necesitas más rutas (ej: obtener el historial de ventas o anular una factura) las agregarás aquí:
// router.get("/", obtenerVentasController);
// router.get("/:id", obtenerVentaPorIdController);

export default router;