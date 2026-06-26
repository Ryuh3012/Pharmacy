import prisma from "../db/connect.mjs";
import { createPerson, findPersonByCedula } from "../models/peopleModel.mjs";
import { createCustomer, findCustomerByPersonaId } from "../models/customerModel.mjs";

export const getClienteByCedulaController = async (req, res) => {
    try {
        const { cedula } = req.params;

        // Buscamos primero en Persona
        const persona = await prisma.persona.findUnique({
            where: { cedula: cedula },
            include: { clientes: true } // Traemos el perfil de cliente asociado
        });

        if (!persona) {
            return res.status(404).json({ success: false, message: "Persona no registrada" });
        }

        res.status(200).json({
            success: true,
            data: {
                nombreCompleto: `${persona.nombrePersona} ${persona.apellidoPersona}`,
                personaId: persona.idPersona,
                tienePerfilCliente: persona.clientes.length > 0
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al consultar persona", detail: error.message });
    }
};

/**
 * POST /api/customers
 * Body esperado:
 *   { cedula: string, nombre: string, apellido: string }
 *
 * Crea Persona y (opcionalmente) Cliente.
 */
export const createCustomerPersonController = async (req, res) => {
    try {
        const { cedula, nombre, apellido } = req.body || {};

        if (!cedula || !nombre || !apellido) {
            return res.status(400).json({
                success: false,
                message: "Faltan datos requeridos: cedula, nombre y apellido."
            });
        }

        // Si ya existe la persona, la devolvemos.
        let persona = await findPersonByCedula(cedula);
        if (!persona) {
            persona = await createPerson({
                cedula,
                nombrePersona: nombre,
                apellidoPersona: apellido
            });
        }

        // Si ya existe cliente ligado, lo usamos.
        let cliente = await findCustomerByPersonaId(persona.idPersona);
        if (!cliente) {
            cliente = await createCustomer({
                personaId: persona.idPersona,
                nombreRazonSocial: `${persona.nombrePersona} ${persona.apellidoPersona}`
            });
        }

        return res.status(201).json({
            success: true,
            customer: {
                cedula: persona.cedula,
                nombre: persona.nombrePersona,
                apellido: persona.apellidoPersona,
                idCliente: cliente.idCliente,
                idPersona: persona.idPersona
            }
        });
    } catch (error) {
        console.error("Error en createCustomerPersonController:", error);
        return res.status(500).json({
            success: false,
            message: "Error interno al registrar cliente",
            detail: error.message
        });
    }
};

