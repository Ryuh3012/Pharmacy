import { config } from "dotenv";

config()

export const tokenJWT = process.env.KEY_JWT
export const port = process.env.PORT
export const DATABASEURL = process.env.DATABASE_URL 