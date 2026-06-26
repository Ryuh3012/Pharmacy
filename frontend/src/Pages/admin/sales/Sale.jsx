import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Input, Skeleton } from '@heroui/react';
import { useAuth } from '../../../Hooks/useAuth';
import { PaymentModal } from '../../components/Modal/PaymentModal';
import NavbarSale from '../../components/Navbar/NavbarSale';
import TicketFactura from '../../components/TicketFactura';




const Sale = () => {
  const user = useAuth();

  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienteData, setClienteData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);


  const totals = useMemo(() => {
    const sub = cart.reduce((acc, i) => acc + Number(i.precio) * i.qty, 0);
    return { subtotal: sub, tax: sub * 0.16, total: sub * 1.16 };
  }, [cart]);


  useEffect(() => {
    let mounted = true;

    const MIN_LOADING_TIME = 1200;
    const startTime = Date.now();

    const timer = setTimeout(async () => {
      const url = searchQuery.length > 2
        ? `http://localhost:3000/products/search?q=${searchQuery}`
        : `http://localhost:3000/products/all`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

        setTimeout(() => {
          if (!mounted) return;
          setProducts(Array.isArray(data) ? data : []);
          setIsLoadingProducts(false);
        }, remaining);
      } catch (err) {
        if (!mounted) return;
        console.error('Error al cargar productos:', err);
        setProducts([]);
        setIsLoadingProducts(false);
      }
    }, 300);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const addToCart = (p) => {
    const item = p.producto || p;
    setCart((prev) => {
      const existing = prev.find((i) => i.idProducto === item.idProducto);
      return existing
        ? prev.map((i) => (i.idProducto === item.idProducto ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.map((i) => (i.idProducto === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0));
  };

  const clearCartAndClose = () => {
    setCart([]);
    setIsModalOpen(false);
  };

  return (
    <NavbarSale title="Ventas">
      <div className="w-full flex gap-6 p-3 md:p-4 bg-cyan-50">


        <style type="text/css">{`
          @media print {
            body * { visibility: hidden !important; }
            #factura-imprimible, #factura-imprimible * { visibility: visible !important; }
            #factura-imprimible {
              display: block !important;
              position: absolute !important;
              top: 0 !important; left: 0 !important;
              width: 80mm !important; background: white !important; color: black !important;
            }
          }
        `}</style>

        <main className="w-full lg:w-2/3 bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-cyan-100 overflow-y-auto max-h-[calc(100vh-6rem)]"> 



          <h1 className="text-2xl font-bold text-cyan-900 mb-6">Catálogo de Productos</h1>

          <Input
            placeholder="Buscar medicamento o producto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-8"
          />

          <div className="grid grid-cols-3 gap-6">
            {isLoadingProducts ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="w-full space-y-5 rounded-2xl bg-cyan-50/50 p-4 border border-cyan-50">
                  <Skeleton className="h-32 rounded-xl" />
                  <div className="space-y-3">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                  </div>
                </div>
              ))
            ) : products.length > 0 ? (
              products.map((item) => {
                const p = item.producto || item;
                return (
                  <Card
                    key={p.idProducto}
                    className="p-5 hover:shadow-cyan-100 hover:shadow-lg transition-all border border-cyan-100 rounded-2xl cursor-pointer"
                  >
                    <button className="w-full h-full text-left focus:outline-none" onClick={() => addToCart(p)}>
                      <h4 className="font-semibold text-cyan-900 text-sm truncate">{p.nombreComercial}</h4>
                      <p className="text-cyan-600 font-extrabold text-lg mt-2">${Number(p.precio).toFixed(2)}</p>
                      <div className="mt-4 w-full text-center text-[10px] text-cyan-400 font-bold uppercase tracking-widest border-t border-cyan-50 pt-2">
                        Agregar a la orden
                      </div>
                    </button>
                  </Card>
                );
              })
            ) : (
              <p className="text-cyan-600">No se encontraron productos disponibles.</p>
            )}
          </div>
        </main>

        <aside className="w-1/3 bg-white rounded-3xl p-8 shadow-sm border border-cyan-100 flex flex-col">
          <h3 className="font-bold text-2xl text-cyan-900 mb-6">Orden Actual</h3>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {cart.map((i) => (
              <div key={i.idProducto} className="flex justify-between items-center p-3 bg-cyan-50 rounded-2xl border border-cyan-100">
                <div>
                  <p className="font-medium text-cyan-900">{i.nombreComercial}</p>
                  <p className="text-xs text-cyan-600">${i.precio} x {i.qty}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="bg-[#696767] text-white"
                    onPress={() => removeFromCart(i.idProducto)}
                  >
                    -
                  </Button>
                  <span className="px-2 font-bold text-cyan-900">{i.qty}</span>
                  <Button isIconOnly size="sm" variant="flat" className="bg-cyan-600 text-white" onPress={() => addToCart(i)}>
                    +
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="bg-red-600 text-white"
                    onPress={() => setCart((prev) => prev.filter((x) => x.idProducto !== i.idProducto))}
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-cyan-100 pt-6">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-cyan-600">
                <span>Sub Total</span>
                <span className="font-medium text-cyan-900">${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cyan-600">
                <span>IVA 16%</span>
                <span className="font-medium text-cyan-900">${totals.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-black text-cyan-950 border-t border-cyan-100 pt-2 mt-2">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Método de pago (ahora está en Sale.jsx) */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {['Pago Móvil', 'Efectivo', 'Punto', 'Zelle'].map((label) => {
                const active = (paymentData?.paymentMethod || 'Efectivo') === label;
                return (
                  <Button
                    key={label}
                    type="button"
                    onPress={() => {
                      setPaymentData((prev) => ({
                        ...(prev || {}),
                        paymentMethod: label,
                      }));
                    }}
                    className={active ? 'bg-cyan-600 text-white font-bold' : 'bg-gray-100 text-slate-700 font-bold'}
                    variant="flat"
                  >
                    {label}
                  </Button>
                );
              })}
            </div>

            <Button
              color="primary"
              className="w-full font-bold text-lg h-12 rounded-2xl shadow-lg shadow-cyan-100"
              disabled={cart.length === 0}
              onPress={() => setIsModalOpen(true)}
            >
              Proceder al Pago
            </Button>

            <PaymentModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              totals={totals}
              cart={cart}
              user={user}
              initialPaymentMethod={paymentData?.paymentMethod || 'Efectivo'}
              onSaleSuccess={(saleData) => {
                // Backend devuelve "data"; PaymentModal también retorna snapshots de pago.
                const resolvedCliente = saleData?.clienteData || saleData?.cliente || saleData?.data?.clienteData || null;
                setClienteData(resolvedCliente);

                // Capturamos el método de pago para que el ticket imprima el correcto.
                setPaymentData(saleData?.paymentSnapshot || null);

                window.print();
                clearCartAndClose();
              }}
            />

          </div>
        </aside>

        <TicketFactura
          cart={cart}
          totals={totals}
          formikValues={paymentData || { paymentMethod: 'Efectivo', selectedBank: '', reference: '' }}
          clienteData={clienteData || {}}
          modalStep={''}
        />


      </div>
    </NavbarSale>
  );
};

export default Sale;

