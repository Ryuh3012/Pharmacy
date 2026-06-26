import React, { useState, useMemo } from 'react';
import { useFormik } from 'formik';
import { 
  Modal, 
  Button, 
  Select, 
  Label, 
  Description, 
  ListBox, 
  Input 
} from '@heroui/react';
import { ClientRegisterForm } from './ClientRegisterForm';

const MAPA_METODOS_PAGO = {
  "Pago Móvil": "PAGO_MOVIL",
  "Efectivo": "EFECTIVO",
  "Punto": "PUNTO",
  "Zelle": "ZELLE"
};

const BANCOS = [
  "BANCO MERCANTIL", "BANCO DE VENEZUELA", "BANESCO", "BANCO PROVINCIAL", 
  "BANCAMIGA", "BANCO DEL TESORO", "BANCO BICENTENARIO", "BANCO EXTERIOR", 
  "BANCO DEL CARIBE", "BANCO VENEZOLANO DE CREDITO", "100%BANCO", "BANCO ACTIVO", 
  "BANCO CARONI", "BANCO NACIONAL DE CREDITO", "BANCO PLAZA", "BANPLUS", "FONDO COMUN"
];

export const PaymentModal = ({ isOpen, onClose, totals, cart, user, onSaleSuccess, initialPaymentMethod = 'Efectivo' }) => {
  const [modalStep, setModalStep] = useState('PAYMENT'); // 'PAYMENT' o 'CREATE_USER'
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [errorInternal, setErrorInternal] = useState(null);
  const paymentFormik = useFormik({
    initialValues: {
      cedula: '',
      montoPagado: '',
      paymentMethod: initialPaymentMethod,
      selectedBank: '',
      reference: '',
    },

    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setErrorInternal(null);

        const empleadoIdDinamico = user?.id || user?.empleadoId;
        if (!empleadoIdDinamico) {
          setErrorInternal("No se detectó una sesión activa de cajero.");
          return;
        }

        if (values.paymentMethod === 'Efectivo' && Number(values.montoPagado) < totals.total) {
          setErrorInternal("El monto recibido no puede ser menor al total de la factura.");
          return;
        }

        const payload = {
          empleadoId: Number(empleadoIdDinamico),
          sucursalId: 1,
          paymentMethod: MAPA_METODOS_PAGO[values.paymentMethod] || "EFECTIVO",

          totals: {
            subtotal: Number(totals.subtotal.toFixed(2)),
            iva: Number(totals.tax.toFixed(2)),
            total: Number(totals.total.toFixed(2))
          },
          cart: cart.map(item => ({
            productoId: item.idProducto,
            idProducto: item.idProducto,
            cantidad: item.qty,
            precioHistorico: Number(item.precio),
            nombreComercial: item.nombreComercial
          })),
          cedulaCliente: values.cedula,
          bancoReceptor: values.selectedBank || null,
          referencia: values.reference || null,
          montoRecibido: values.montoPagado ? Number(values.montoPagado) : Number(totals.total.toFixed(2))
        };

        // POST a backend: aquí es donde se guarda la venta y el carrito
        const response = await fetch('http://localhost:3000/api/sales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          // Normalizamos errores para que caigan en el catch con la misma forma
          const message = data?.message || 'Error al procesar el pago.';
          throw { response: { data: { message }, status: response.status } };
        }

        console.log("Venta procesada con éxito:", data);

        // Pasamos también los datos del cliente para que el ticket pueda imprimirlos.
        // Si el backend no devuelve cliente, al menos usamos lo que se ingresó/seleccionó.
        const resolvedCliente =
          data?.clienteData ||
          data?.cliente ||
          (values.cedula ? {
            cedula: values.cedula,
            nombre: clienteSeleccionado?.nombre || clienteSeleccionado?.nombrePersona || '',
            apellido: clienteSeleccionado?.apellido || clienteSeleccionado?.apellidoPersona || '',
            nombreCompleto:
              clienteSeleccionado?.nombreCompleto ||
              (clienteSeleccionado?.nombre && clienteSeleccionado?.apellido
                ? `${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido}`
                : '')
          } : null);

        resetForm();
        setClienteSeleccionado(null);
        setModalStep('PAYMENT');
        if (onSaleSuccess) {
          onSaleSuccess({
            ...data,
            clienteData: resolvedCliente,
            paymentSnapshot: {
              paymentMethod: values.paymentMethod,
              selectedBank: values.selectedBank || '',
              reference: values.reference || '',
              montoPagado: values.montoPagado || '',
            },
          });
        }
        onClose();


      } catch (error) {
        // Backend actualiza el caso de "no existe el cliente" con status 404.
        const message = error?.response?.data?.message;
        const status = error?.response?.status;

        if (status === 404 || message === "CLIENT_NOT_FOUND" || message === "El usuario no está registrado en el sistema.") {
          setModalStep('CREATE_USER');
        } else {
          setErrorInternal(message || "Error interno al procesar el pago.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const vuelto = useMemo(() => {
    if (paymentFormik.values.paymentMethod !== 'Efectivo' || !paymentFormik.values.montoPagado) return 0;
    const calculo = Number(paymentFormik.values.montoPagado) - totals.total;
    return calculo > 0 ? calculo : 0;
  }, [paymentFormik.values.montoPagado, paymentFormik.values.paymentMethod, totals.total]);

  const handleClientCreated = (nuevoCliente) => {
    setClienteSeleccionado(nuevoCliente); 
    paymentFormik.setFieldValue('cedula', nuevoCliente.cedula); 
    setModalStep('PAYMENT'); 
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            
            {modalStep === 'PAYMENT' ? (
              <>
                {/* 1. HEADER (Estructura pura de HeroUI) */}
                <Modal.Header>
                  <Modal.Heading className="text-xl font-bold text-cyan-950">
                    Procesar {paymentFormik.values.paymentMethod}
                  </Modal.Heading>
                </Modal.Header>

                {/* 2. BODY (Aquí encapsulamos el formulario nativo) */}
                <Modal.Body>
                  <form id="payment-form" onSubmit={paymentFormik.handleSubmit} className="space-y-4">
                    {errorInternal && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs text-center font-semibold">
                        {errorInternal}
                      </div>
                    )}

                    {clienteSeleccionado && (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-medium">
                        🚀 <strong>Cliente Vinculado:</strong> {clienteSeleccionado.nombre} {clienteSeleccionado.apellido}
                      </div>
                    )}

                    <div className="bg-cyan-50/70 p-4 rounded-2xl text-center border border-cyan-100">
                      <Description className="text-xs text-cyan-600 font-bold uppercase tracking-wider">Total a Facturar</Description>
                      <p className="text-3xl font-black text-cyan-700">${totals.total.toFixed(2)}</p>
                    </div>

                    <Input 
                      label="Cédula del Cliente" 
                      name="cedula"
                      value={paymentFormik.values.cedula} 
                      onChange={paymentFormik.handleChange}
                      variant="bordered"
                      placeholder="Ej: V-26888999"
                      required
                    />



                    {/* Campos dependientes del método */}
                    {['Pago Móvil', 'Punto'].includes(paymentFormik.values.paymentMethod) && (
                      <div className="grid grid-cols-1 gap-3 mt-2">
                        <Select
                          selectedKeys={paymentFormik.values.selectedBank ? [paymentFormik.values.selectedBank] : []}
                          onSelectionChange={(keys) => {
                            const value = Array.from(keys)[0];
                            paymentFormik.setFieldValue('selectedBank', value);
                          }}
                        >
                          <Label className="text-sm font-medium text-slate-700 mb-1">Banco Receptor</Label>
                          <Select.Trigger>
                            <Select.Value placeholder="Selecciona un banco" />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox>
                              {BANCOS.map((banco) => (
                                <ListBox.Item key={banco} id={banco} textValue={banco}>
                                  <Label>{banco}</Label>
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Select.Popover>
                        </Select>

                        <Input 
                          label="Número de Referencia" 
                          name="reference"
                          value={paymentFormik.values.reference} 
                          onChange={paymentFormik.handleChange}
                          variant="bordered"
                          placeholder="Últimos 4 o 6 dígitos"
                          required
                        />
                      </div>
                    )}

                    {paymentFormik.values.paymentMethod === 'Zelle' && (
                      <Input 
                        label="Referencia de Zelle" 
                        name="reference"
                        value={paymentFormik.values.reference} 
                        onChange={paymentFormik.handleChange}
                        variant="bordered"
                        placeholder="Código de confirmación"
                        required
                      />
                    )}


                    <Input 
                      label={paymentFormik.values.paymentMethod === 'Efectivo' ? "Monto Recibido ($)" : "Monto a Confirmar ($)"}
                      name="montoPagado"
                      type="number"
                      step="0.01"
                      value={paymentFormik.values.montoPagado} 
                      onChange={paymentFormik.handleChange}
                      variant="bordered"
                      placeholder={totals.total.toFixed(2)}
                      required
                    />

                    {paymentFormik.values.paymentMethod === 'Efectivo' && vuelto > 0 && (
                      <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl flex justify-between items-center text-sm font-bold">
                        <span>Vuelto al Cliente:</span>
                        <span className="text-lg text-amber-700">${vuelto.toFixed(2)}</span>
                      </div>
                    )}
                  </form>
                </Modal.Body>

                {/* 3. FOOTER (Usa el atributo 'form' para disparar el submit desde afuera) */}
                <Modal.Footer className="flex gap-3 pt-4">
                  <Button variant="flat" className="flex-1 font-bold text-slate-500" onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    form="payment-form" 
                    color="primary" 
                    className="flex-1 font-bold bg-cyan-600 text-white" 
                    isLoading={paymentFormik.isSubmitting}
                  >
                    Registrar Pago
                  </Button>
                </Modal.Footer>
              </>
            ) : (
              <Modal.Body>
                <ClientRegisterForm 
                  cedula={paymentFormik.values.cedula} 
                  onClientCreated={handleClientCreated} 
                  onCancel={() => setModalStep('PAYMENT')} 
                />
              </Modal.Body>
            )}

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};