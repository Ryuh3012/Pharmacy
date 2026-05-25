import mongoose from 'mongoose'
import { mongoURI } from '../config/config.mjs';

// Tu URI de Atlas ya con la contraseña integrada y apuntando a la base de datos 'products'
const MONGO_URI =  mongoURI;

export const connectdb = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        return console.log('Base de datos online');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}