import prisma from "../db/connect.mjs";

// Solo busca
export const findCustomerByPersonaId = async (personaId, tx = prisma) => {
    return await tx.cliente.findUnique({
        where: { personaId: personaId }
    });
};

// Solo crea
export const createCustomer = async (data, tx = prisma) => {
    return await tx.cliente.create({
        data: {
            personaId: data.personaId,
            nombreRazonSocial: data.nombreRazonSocial || "Consumidor Final"
        }
    });
};