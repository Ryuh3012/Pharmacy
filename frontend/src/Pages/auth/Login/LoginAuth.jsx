import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import axios from "axios";
import { Label, Input, Button } from "@heroui/react"; // 1. Imports unificados

import Layout from "../Layout";

const initialValues = { userName: '', password: '' };

const LoginAuth = () => {
    const [errorInternal, setErrorInternal] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();

    const { handleSubmit, handleChange, handleBlur, values: { userName, password } } = useFormik({
        initialValues,
        onSubmit: async (values) => {
            setIsLoading(true);
            setErrorInternal(null);

            try {
                const { data } = await axios.post('http://localhost:3000/auth', values);
                console.log(data)

                // 2. Validación corregida para objetos JSON
                if (data && data.user) {
                    setMessage('El usuario se ha logueado correctamente');

                    setTimeout(() => {
                        setMessage(null);
                        setIsLoading(false);
                        
                        // 3. Redirección inteligente basada en el rol que armamos
                        if (data.user.rol === 'Administrador') {
                            navigation('/admin');
                        } else if (data.user.rol === 'vendedor') {
                            navigation('/caja');
                        } else {
                            navigation('/');
                        }
                    }, 2000);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Error al conectar con el servidor";
                setErrorInternal(errorMessage);
                setIsLoading(false);

                setTimeout(() => setErrorInternal(null), 3000);
            }
        }
    });

    return (
        <Layout>
            <div className="flex w-full max-w-[78rem] shadow-2xl rounded-lg bg-[#e5e5e5]">
                <form
                    className="flex flex-col justify-center items-center w-full gap-5 rounded-lg p-6"
                    onSubmit={handleSubmit}
                >
                    {errorInternal && (
                        <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded relative text-center ">
                            {errorInternal}
                        </div>
                    )}
                    
                    {message && (
                        <div className="bg-teal-100 border border-teal-500 text-teal-900 px-3 py-2 rounded relative text-center">
                            {message}
                        </div>
                    )}

                    <p className="text-2xl font-bold mb-4 text-center">Inicio Sesión</p>

                    <div className="flex flex-col gap-1 w-1/2">
                        <Label>Usuario</Label>
                        <Input
                            label="Usuario"
                            variant="flat"
                            name="userName"
                            value={userName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            placeholder="Introduzca su usuario"
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-1/2">
                        <Label>Contraseña</Label>
                        <Input
                            label="Contraseña"
                            placeholder="*******"
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            variant="flat"
                        />
                    </div>

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        className="w-[18em] p-2 mt-4 text-white cursor-pointer bg-[#007BFF] rounded-sm hover:bg-[#007bff92]"
                    >
                        {isLoading ? "Verificando..." : "Iniciar sesión"}
                    </Button>
                </form>

                <img
                    src="https://docenzia.com/blog/wp-content/uploads/2023/04/que-se-necesita-para-trabajar-en-una-farmacia.jpg"
                    alt="Farmacia"
                    className="object-cover rounded-r-lg w-[50%]"
                />
            </div>
        </Layout>
    );
};

export default LoginAuth;