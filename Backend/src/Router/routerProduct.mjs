// 1. Importaciones obligatorias primero
import { Router } from "express";
import { handleSearch, handleGetAll } from "../controllers/productController.mjs";

// 2. DECLARACIÓN DEL ROUTER (Aquí es donde olvidaste inicializarlo)
const router = Router();

// 3. Definición de rutas
router.get("/products/search", handleSearch);
router.get("/products/all", handleGetAll);

// 4. Exportación del router
export default router;