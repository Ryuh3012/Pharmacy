import React from 'react';
import { useFormik } from 'formik';
import { Input, Button, Modal } from '@heroui/react'; // O tu librería de componentes (HeroUI)
import axios from 'axios';

export const ClientRegisterForm = ({ cedula, onClientCreated, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      cedula: cedula,
      nombre: '',
      apellido: '',
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        // 1. Guardamos el cliente en la base de datos
        const response = await axios.post('http://localhost:3000/api/customers', values);

        // 2. Normaliza el objeto del cliente devuelto por el backend
        // Soportamos varios formatos comunes: { customer }, { data: { customer } }, o el objeto directo.
        const payload = response?.data;
        const customer = payload?.customer || payload?.data?.customer || payload?.data || payload;

        const nuevoCliente = {
          cedula: customer?.cedula ?? values.cedula,
          nombre: customer?.nombre ?? values.nombre,
          apellido: customer?.apellido ?? values.apellido,
          ...customer,
        };

        onClientCreated(nuevoCliente);
      } catch (error) {
        // Log completo para diagnosticar el shape real del backend
        // eslint-disable-next-line no-console
        console.error('Error al registrar cliente:', error?.response?.data || error);

        const data = error?.response?.data;
        const msg =
          data?.message ||
          data?.error ||
          data?.errors?.[0]?.message ||
          data?.details?.message ||
          data?.statusMessage ||
          'No se pudo registrar el cliente';

        setFieldError('general', msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Modal.Header className="px-0 pt-0 flex flex-col gap-1">
        <h2 className="text-xl font-bold text-cyan-950">Registrar Cliente Nuevo</h2>
        <p className="text-xs text-slate-500">La cédula no existe. Regístrelo para continuar con la venta.</p>
      </Modal.Header>

      {formik.errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-2 rounded text-xs text-center font-medium">
          {formik.errors.general}
        </div>
      )}

      <Input 
        label="Cédula" 
        name="cedula"
        value={formik.values.cedula} 
        disabled 
        className="opacity-70"
      />

      <Input 
        label="Nombre" 
        placeholder="Nombre del cliente"
        name="nombre" 
        value={formik.values.nombre} 
        onChange={formik.handleChange} 
        variant="bordered"
        required
      />

      <Input 
        label="Apellido" 
        placeholder="Apellido del cliente"
        name="apellido" 
        value={formik.values.apellido} 
        onChange={formik.handleChange} 
        variant="bordered"
        required
      />

      <Modal.Footer className="flex gap-3 mt-4 px-0 pb-0">
        <Button variant="flat" type="button" className="flex-1 font-bold" onClick={onCancel}>
          Atrás
        </Button>
        <Button color="success" type="submit" className="flex-1 font-bold text-white bg-emerald-600" isLoading={formik.isSubmitting}>
          Registrar y Continuar
        </Button>
      </Modal.Footer>
    </form>
  );
};
















