// En tu index.mjs o app.mjs principal
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import routerAuth from './src/Router/routerAuth.mjs'
const app = express();

// Middlewares obligatorios
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser()); // 🍪 ¡Clave para que el middleware lea las cookies!

// 🚀 Vinculas las rutas con el prefijo /auth
app.use("/auth", routerAuth);

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000 🚀"));