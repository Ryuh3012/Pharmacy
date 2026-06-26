import prisma from "../db/connect.mjs";

// --- TUS FUNCIONES ATÓMICAS ---

export const createVenta = async (data, tx = prisma) => {
    // Extraemos de forma segura priorizando si ya los limpiamos en el controlador
    // o buscándolos dentro del objeto 'totals' del frontend
    const subtotalValido = parseFloat(data.subtotal) || parseFloat(data.totals?.subtotal) || 0;
    const ivaValido = parseFloat(data.iva) || parseFloat(data.totals?.iva) || 0;

    let totalValido = parseFloat(data.totalVenta) || parseFloat(data.total) || parseFloat(data.totals?.total) || 0;

    // Salvavidas matemático por si acaso
    if (isNaN(totalValido) || totalValido === 0) {
        totalValido = subtotalValido + ivaValido;
    }

    return await tx.venta.create({
        data: {
            numeroFactura: `FAC-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
            // Usamos .toFixed(2) para que Prisma reciba un String numérico limpio compatible con Decimal(10,2)
            subtotal: subtotalValido.toFixed(2),
            iva: ivaValido.toFixed(2),
            totalVenta: totalValido.toFixed(2),
            sucursalId: Number(data.sucursalId),
            empleadoId: Number(data.empleadoId),
            clienteId: data.clienteId ? Number(data.clienteId) : null
        }
    });
};

export const createDetallesVenta = async (items, ventaId, tx = prisma) => {
    const data = items.map(item => ({
        ventaId: ventaId,
        productoId: Number(item.productoId || item.idProducto),
        cantidad: Number(item.cantidad),
        precioHistorico: (parseFloat(item.precioHistorico) || 0).toFixed(2)
    }));
    return await tx.detalleVenta.createMany({ data });
};

export const createPayment = async (pagoData, ventaId, tx = prisma) => {
    const { paymentMethod, totals, selectedBank, reference, montoRecibido, bancoReceptor } = pagoData;

    // Validamos los montos de forma segura
    const montoTotal = parseFloat(totals?.total) || parseFloat(pagoData.totalVenta) || 0;
    const montoRecibidoValido = montoRecibido ? parseFloat(montoRecibido) : montoTotal;

    // CORRECCIÓN: Usar 'pagoVenta' que es el nombre exacto generado por Prisma
    return await tx.pagoVenta.create({
        data: {
            ventaId: ventaId,
            metodoPago: paymentMethod,
            montoPagado: montoTotal.toFixed(2),
            bancoReceptor: selectedBank || bancoReceptor || null,
            referencia: reference || null,
            montoRecibido: montoRecibidoValido.toFixed(2)
        }
    });
};

// --- EL ORQUESTADOR ---

/**
 * Este modelo coordina la secuencia de inserciones.
 * Es el que llamarás desde tu registrarVentaController.
 */
export const createVentaTransactionModel = async (datosVenta) => {
    return await prisma.$transaction(async (tx) => {
        // 1. Crear la Venta
        const venta = await createVenta(datosVenta, tx);

        // 2. Crear los Detalles usando el ID de la venta creada
        await createDetallesVenta(datosVenta.cart, venta.idVenta, tx);

        // 3. Crear el Pago
        await createPayment(datosVenta, venta.idVenta, tx);

        // 4. (Opcional) Aquí podrías agregar la función de actualizar stock
        // await updateStock(datosVenta.cart, datosVenta.sucursalId, tx);

        return venta;
    });
};