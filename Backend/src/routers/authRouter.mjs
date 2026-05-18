import { Router } from "express";
import { singIn } from "../controllers/authController.mjs";

const route = Router()

route.post('/auth', singIn)

export default route
