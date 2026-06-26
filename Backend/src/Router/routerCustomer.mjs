// src/Router/routerCustomer.mjs
import { Router } from "express";
import { createCustomerPersonController } from "../controllers/customerController.mjs";

const router = Router();

// POST http://localhost:3000/api/customers
// Crea una Persona (cedula, nombre, apellido) y luego opcionalmente crea Cliente.
router.post("/api/customers", createCustomerPersonController);

export default router;

