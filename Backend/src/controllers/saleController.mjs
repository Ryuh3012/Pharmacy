import { createCustomer, findCustomerByPersonaId } from "../models/customerModel.mjs";
import { createPerson, findPersonByCedula } from "../models/peopleModel.mjs";
import { createVentaTransactionModel } from "../models/saleModel.mjs";

export const registrarVentaController = async (req, res) => {
    try {
        const datosVenta = req.body;
        
        // Desestructuramos lo que viene desde el frontend
        const { cedulaCliente, cart, sucursalId, empleadoId, totals } = datosVenta;
        
        // 1. Validaciones robustas de estructura
        if (!cart || cart.length === 0) {
            return res.status(400).json({ success: false, message: "Carrito vacío." });
        }

        // Convertimos a números los IDs de forma segura
        const numericSucursalId = Number(sucursalId);
        const numericEmpleadoId = Number(empleadoId);

        if (isNaN(numericSucursalId) || isNaN(numericEmpleadoId)) {
            return res.status(400).json({ success: false, message: "Datos de sucursal o empleado inválidos." });
        }

        // 2. Extracción ultra-segura de totales
        const subtotal = parseFloat(totals?.subtotal) || 0;
        const iva = parseFloat(totals?.iva) || 0;
        let totalCalculado = parseFloat(totals?.total) || parseFloat(totals?.totalVenta) || 0;

        if (isNaN(totalCalculado) || totalCalculado === 0) {
            totalCalculado = parseFloat((subtotal + iva).toFixed(2));
        }

        // 3. ORQUESTACIÓN: Identidad del Cliente (Validación estricta)
        let clienteId = null;
        
        if (cedulaCliente) {
            // Buscamos si la persona existe por cédula
            let persona = await findPersonByCedula(cedulaCliente);
            
            // CORRECCIÓN: Si no existe, no la creamos. Respondemos para detonar el modal en el front.
            if (!persona) {
                return res.status(404).json({ 
                    success: false, 
                    code: "CLIENT_NOT_FOUND",
                    message: "El usuario no está registrado en el sistema." 
                });
            }

            // Si la persona existe, verificamos que tenga un perfil de cliente asociado
            let cliente = await findCustomerByPersonaId(persona.idPersona);
            if (!cliente) {
                // Si existe la persona (ej. un empleado) pero no está registrado como cliente, lo asociamos rápido
                cliente = await createCustomer({
                    personaId: persona.idPersona,
                    nombreRazonSocial: `${persona.nombrePersona} ${persona.apellidoPersona}`
                });
            }
            clienteId = cliente.idCliente;
        }

        // 4. Limpiamos 'datosVenta' de cualquier propiedad vieja que arrastre el total incorrecto
        const { totalVenta, ...datosLimpios } = datosVenta;

        // 5. Ejecutar transacción
        const ventaRealizada = await createVentaTransactionModel({
            ...datosLimpios,
            clienteId,
            sucursalId: numericSucursalId,
            empleadoId: numericEmpleadoId,
            subtotal,
            iva,
            totalVenta: totalCalculado,
            totals: {
                subtotal,
                iva,
                total: totalCalculado
            }
        });

        // Traer joins para el ticket (Sucursal, Cliente)
        // Queremos un shape consistente con lo que TicketFactura necesita.
        const ventaId = ventaRealizada?.idVenta;

        let ventaTicketData = ventaRealizada;
        if (ventaId) {
            // Usamos Prisma relacional directo.
            // Si tu schema usa nombres distintos, ajustamos aquí.
            const ventaConJoins = await prisma.venta.findUnique({
                where: { idVenta: Number(ventaId) },
                include: {
                    sucursal: true,
                    cliente: true,
                    pagoVenta: true,
                }
            }).catch(() => null);

            if (ventaConJoins) {
                ventaTicketData = {
                    ...ventaConJoins,
                    pago: ventaConJoins?.pagoVenta?.[0] || ventaConJoins?.pagoVenta || null,
                };
            }
        }

        return res.status(201).json({
            success: true,
            message: "¡Venta procesada con éxito!",
            data: ventaTicketData
        });

    } catch (error) {
        console.error("Error en registrarVentaController:", error);

        if (error.message?.startsWith("STOCK_INSUFICIENTE:")) {
            return res.status(400).json({ success: false, message: error.message });
        }

        return res.status(500).json({
            success: false,
            message: "Error interno al procesar la venta.",
            detail: error.message
        });
    }
};