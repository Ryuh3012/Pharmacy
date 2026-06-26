// En tu index.mjs o app.mjs principal
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { port } from "./src/config/confing.mjs";

import routerAuth from './src/Router/routerAuth.mjs'
import routerProduct from './src/Router/routerProduct.mjs'
import routerSale from './src/Router/routerSale.mjs'
import routerCustomer from './src/Router/routerCustomer.mjs'
const app = express();


// Middlewares obligatorios
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser()); // 🍪 ¡Clave para que el middleware lea las cookies!

// 🚀 Vinculas las rutas con el prefijo /auth
app.use(routerAuth)
app.use(routerProduct)
app.use(routerSale)
app.use(routerCustomer)

app.listen(port, () => {
    console.log('listo ')
})









