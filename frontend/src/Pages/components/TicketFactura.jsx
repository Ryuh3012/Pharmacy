import React, { useMemo } from 'react';

const DEFAULT_FARMACIA = {
  nombre: 'FARMACIA',
  rif: 'RIF: J-50123456-7',
  direccion: 'Dirección: Principal',
  sucursal: 'Sucursal: Principal',
};

function safeTrim(v) {
  if (v === null || v === undefined) return '';
  return String(v).trim();
}

/**
 * TicketFactura (80mm) - impresión térmica.
 *
 * Props:
 * - cart: array de productos [{ codigo, nombreComercial, qty, precio, ... }]
 * - totals: { subtotal, tax, total }
 * - formikValues: datos del formulario de pago y cliente
 * - modalStep: string (opcional)
 * - clienteData: objeto consultado por cédula en BD { cedula, nombre, apellido } o {}
 */
const TicketFactura = ({
  cart = [],
  totals,
  formikValues,
  modalStep,
  clienteData = {},
}) => {
  const ticketNro = useMemo(() => Date.now(), [modalStep]);

  const detalleItems = Array.isArray(cart) ? cart : [];

  const subtotal = Number(totals?.subtotal ?? 0);
  const iva = Number(totals?.tax ?? 0);
  const total = Number(totals?.total ?? 0);

  // Cliente resuelto (BD si existe)
  const hasClienteDB = Boolean(
    safeTrim(clienteData?.cedula) ||
    safeTrim(clienteData?.nombre) ||
    safeTrim(clienteData?.apellido) ||
    safeTrim(clienteData?.nombreCompleto)
  );

  // Datos desde el formik / snapshot que llega desde PaymentModal
  const cedulaFromForm =
    safeTrim(formikValues?.cedula) ||
    safeTrim(formikValues?.clienteCedula) ||
    safeTrim(formikValues?.cliente?.cedula) ||
    safeTrim(formikValues?.clienteData?.cedula) ||
    '';

  const nombreFromForm =
    safeTrim(formikValues?.nombre) ||
    safeTrim(formikValues?.clienteNombre) ||
    safeTrim(formikValues?.cliente?.nombre) ||
    safeTrim(formikValues?.clienteData?.nombre) ||
    '';

  const apellidoFromForm =
    safeTrim(formikValues?.apellido) ||
    safeTrim(formikValues?.clienteApellido) ||
    safeTrim(formikValues?.cliente?.apellido) ||
    safeTrim(formikValues?.clienteData?.apellido) ||
    '';

  // Si viene nombreCompleto como "Nombre Apellido" lo separamos para completar el ticket.
  const nombreCompletoForm = safeTrim(
    formikValues?.nombreCompleto || formikValues?.clienteNombreCompleto || formikValues?.clienteData?.nombreCompleto
  );
  const [nombreFromFullForm, ...restForm] = nombreCompletoForm ? nombreCompletoForm.split(' ') : [];
  const apellidoFromFullForm = restForm.join(' ');

  const cedulaFromDB = safeTrim(clienteData?.cedula);
  const nombreFromDB = safeTrim(clienteData?.nombre);
  const apellidoFromDB = safeTrim(clienteData?.apellido);

  const nombreCompletoBD = safeTrim(clienteData?.nombreCompleto);
  const [nombreFromFullDB, ...restDB] = nombreCompletoBD ? nombreCompletoBD.split(' ') : [];
  const apellidoFromFullDB = restDB.join(' ');

  const cedula = (hasClienteDB ? cedulaFromDB : cedulaFromForm) || '';

  const nombreFinal = hasClienteDB
    ? (nombreFromDB || nombreFromFullDB || '')
    : (nombreFromForm || nombreFromFullForm || (cedula ? 'N/A' : 'N/A'));

  const apellidoFinal = hasClienteDB
    ? (apellidoFromDB || apellidoFromFullDB || '')
    : (apellidoFromForm || apellidoFromFullForm || '');

  // Fallback: si el backend no trae cliente pero el front sí tiene snapshot,
  // intenta extraer nombre/apellido desde la información que llega al ticket.
  const nombreFinalConFallback = safeTrim(nombreFinal) || safeTrim(formikValues?.clienteNombre) || safeTrim(formikValues?.nombre) || '';
  const apellidoFinalConFallback = safeTrim(apellidoFinal) || safeTrim(formikValues?.clienteApellido) || safeTrim(formikValues?.apellido) || '';




  // Pago
  const metodoPago =
    safeTrim(formikValues?.paymentMethod) ||
    safeTrim(formikValues?.metodoPago) ||
    safeTrim(formikValues?.metodo) ||
    '—';

  const banco = safeTrim(formikValues?.selectedBank) || safeTrim(formikValues?.banco) || '';
  const referencia = safeTrim(formikValues?.reference) || safeTrim(formikValues?.referencia) || '';

  const showBancoRef = Boolean(banco) || Boolean(referencia);


  // IVA label según requerimiento (en tu app el monto ya viene en totals.tax)
  const ivaLabel = 'IVA 12%';

  return (
    <div id="factura-imprimible" className="hidden print:block w-[80mm] font-mono text-black">
      <style type="text/css">{`
        @media print {
          body * { visibility: hidden !important; }
          #factura-imprimible, #factura-imprimible * { visibility: visible !important; }
          #factura-imprimible {
            display: block !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 80mm !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* Cabecera */}
      <div className="text-center px-1">
        <div className="font-bold text-sm leading-tight">{DEFAULT_FARMACIA.nombre}</div>
        <div className="text-[10px] leading-tight">{DEFAULT_FARMACIA.rif}</div>
        <div className="text-[10px] leading-tight">{DEFAULT_FARMACIA.direccion}</div>
        <div className="text-[10px] leading-tight">{DEFAULT_FARMACIA.sucursal}</div>

        <div className="mt-2 text-[10px] leading-tight flex justify-between">
          <span>Nro Factura: {ticketNro}</span>
          <span>
            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Cliente */}
      <div className="mt-2 px-1 text-[10px]">
        <div className="flex justify-between">
          <span className="font-bold">CLIENTE</span>
          <span className="text-right">—</span>
        </div>
        <div className="mt-1 leading-tight">
          Cédula: {cedula || 'N/A'} | Nombre: {nombreFinalConFallback} {apellidoFinalConFallback}
        </div>
      </div>

      {/* Cuerpo (productos) */}
      <div className="mt-2 px-1 text-[10px]">
        <div className="border-t border-black/40 pt-2">
          <div className="flex justify-between">
            <span>Prod</span>
            <span className="w-10 text-right">Cant</span>
            <span className="w-16 text-right">Precio</span>
          </div>

          <div className="mt-2">
            {detalleItems.map((item, idx) => {
              const codigo = item?.codigo ?? item?.codigoProducto ?? '';
              const nombre = item?.nombreComercial ?? item?.nombre ?? 'Producto';
              const qty = item?.qty ?? item?.cantidad ?? 1;
              const precio = Number(item?.precio ?? item?.precioHistorico ?? 0).toFixed(2);

              return (
                <div key={item?.idProducto ?? idx} className="flex justify-between gap-2 py-0.5">
                  <div className="flex-1">
                    <div className="leading-tight">
                      {[codigo ? String(codigo).slice(0, 10) : '', nombre].filter(Boolean).join(' ')}
                    </div>
                  </div>
                  <div className="w-10 text-right">{qty}</div>
                  <div className="w-16 text-right">${precio}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Totales */}
      <div className="mt-2 px-1 text-[10px]">
        <div className="border-t border-black/40 pt-2">
          <div className="flex justify-between border-b border-dashed border-black/40 pb-1">
            <span>Base Imponible</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-black/40 pb-1 mt-1">
            <span>{ivaLabel}</span>
            <span>${iva.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-bold text-[11px]">TOTAL FINAL</span>
            <span className="font-bold text-[11px]">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Pie */}
      <div className="mt-2 px-1 text-[10px]">
        <div className="border-t border-black/40 pt-2">
          <div className="flex justify-between">
            <span>Método de pago:</span>
            <span className="font-bold">{metodoPago}</span>
          </div>

          {showBancoRef && (
            <div className="mt-1">
              {banco ? (
                <div className="flex justify-between">
                  <span>Banco:</span>
                  <span className="text-right">{banco}</span>
                </div>
              ) : null}
              {referencia ? (
                <div className="flex justify-between mt-0.5">
                  <span>Ref:</span>
                  <span className="text-right">{referencia}</span>
                </div>
              ) : null}
            </div>
          )}

          <div className="text-center mt-2 font-bold text-[10px]">Gracias por su visita</div>

          <div className="mt-2 h-10 flex items-end justify-center">
            <div className="w-full h-7 border border-black/30 flex items-center justify-center text-[8px] opacity-80">
              [BARCODE]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketFactura;

