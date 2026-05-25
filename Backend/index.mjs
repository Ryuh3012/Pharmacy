import cors from "cors";
import express from 'express';
import cookieParser from 'cookie-parser'; // 1. Importamos el manejador de cookies

import authRouter from "./src/routers/authRouter.mjs";
import { connectdb } from "./src/db/connect.mjs";
import { port } from "./src/config/config.mjs";

const app = express();


try {
    connectdb();

    // 2. Ajustamos CORS para permitir credenciales/cookies con tu Frontend
    app.use(cors({
        origin: "http://localhost:5173", // 👈 Pon aquí la URL exacta de tu frontend de React (Vite usa la 5173 por defecto)
        credentials: true                // 👈 Crucial: Permite que viajen las cookies entre front y back
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser()); // 3. Habilitamos Express para que procese cookies

    app.use(authRouter);

    app.listen(port, () => console.log('Servidor corriendo en el puerto 3000'));
} catch (error) {
    console.log(error);
}