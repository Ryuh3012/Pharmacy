import prisma from "../db/connect.mjs";

// Solo busca
export const findPersonByCedula = async (cedula, tx = prisma) => {
    return await tx.persona.findUnique({
        where: { cedula: cedula.toString() }
    });
};

// Solo lista
export const findAllPeople = async (tx = prisma) => {
    return await tx.persona.findMany();
};

// Solo crea
export const createPerson = async (data, tx = prisma) => {
    return await tx.persona.create({
        data: {
            cedula: data.cedula.toString(),
            nombrePersona: data.nombrePersona,
            apellidoPersona: data.apellidoPersona
        }
    });
};