// src/models/authModel.mjs
// Importamos la instancia de Prisma Client que conecta con tu base de datos
import prisma from "../db/connect.mjs"; 

/**
 * Busca un usuario único en la base de datos mediante su nombre de usuario
 * @param {string} nombreUsuario - El string del usuario que viene del frontend
 */
export const findOneByAuthModel = async (nombreUsuario) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { 
                usuario: nombreUsuario 
            },
            // Con select le decimos a Prisma exactamente qué columnas queremos traer
            select: {
                idUsuario: true,
                usuario: true,
                password: true,      // Lo necesitamos para que bcrypt.compare funcione
                rolId: true,         // El ID numérico (1, 2) vital para tus middlewares guardianes
                sucursalRegistroId: true,
                
                // Relación: Traemos datos específicos de la Persona vinculada
                persona: {
                    select: {
                        nombrePersona: true,
                        apellidoPersona: true
                    }
                },
                
                // Relación: Traemos el nombre del Rol ("Admin", "Cajero")
                rol: {
                    select: {
                        roles: true
                    }
                }
            }
        });

        return usuario;
    } catch (error) {
        console.error("Error en findOneByAuthModel de Prisma:", error);
        throw new Error("Error al consultar la base de datos");
    }
};