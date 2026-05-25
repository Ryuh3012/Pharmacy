import { Schema, model } from "mongoose";


const schemaPeoples = new Schema({
    dni: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    telefono: { type: String, trim: true },
    direccion: {
        calle: { type: String, trim: true },
        ciudad: { type: String, trim: true },
        estado: { type: String, trim: true }
    }
}, {
    timestamps: true
});

const schemaUser = new Schema({
    nameUser: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, required: true },
    peopleid: { type: Schema.Types.ObjectId, ref: 'peoples' }


})

export const people = model('peoples', schemaPeoples)
export const user = model('users', schemaUser)
