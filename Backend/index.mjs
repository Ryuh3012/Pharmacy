import cors from "cors";
import express from 'express'
import authRouter from "./src/routers/authRouter.mjs";

const app = express()
const port = 3000

try {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))

    app.use(authRouter)

    app.listen(port, () => console.log('serve en el puerto 3000'))
} catch (error) {
    console.log(error)
}
