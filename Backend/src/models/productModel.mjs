// IMPORTANTE: Importa la instancia única que ya tienes configurada
// para mantener una sola conexión abierta a la base de datos.
import prisma from "../db/connect.mjs"; 

/**
 * Busca productos basados en múltiples criterios:
 * Nombre, Principio Activo o Categoría.
 */
export const searchProducts = async (query) => {
    return await prisma.producto.findMany({
        where: {
            OR: [
                { nombreComercial: { contains: query, mode: 'insensitive' } },
                { principioActivo: { contains: query, mode: 'insensitive' } },
                {
                    categoria: {
                        nombreCategoria: { contains: query, mode: 'insensitive' }
                    }
                }
            ]
        },
        include: {
            categoria: true,
            empresa: true,
            inventarios: {
                include: { sucursal: true }
            }
        }
    });
};

/**
 * Obtiene todos los productos con su inventario para una sucursal específica
 */
export const getInventoryBySucursal = async (sucursalId) => {
    return await prisma.inventarioSucursal.findMany({
        where: { sucursalId: parseInt(sucursalId) },
        include: {
            producto: {
                include: {
                    categoria: true,
                    empresa: true
                }
            },
            sucursal: true
        }
    });
};