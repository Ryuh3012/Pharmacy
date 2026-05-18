import { Label } from "@heroui/react";
import Layout from "../Layout"
import { Input, Button } from "@heroui/react";
import { useFormik } from "formik";
import axios from 'axios';

const initialValues = { userName: '', password: '' }

const LoginAuth = () => {

    const { handleSubmit, handleChange, handleBlur, values: { userName, password } } = useFormik({

        initialValues,
        onSubmit: async (values) => {

            try {
                const { data } = await axios.post('http://localhost:3000/auth', values)
                    .catch(({ response: { data: { message } } }) => {
                        setErrorInternal(message)
                        setTimeout(() => {
                            setErrorInternal(null)
                        }, 3000);

                    })
                    console.log(data)

            }
            catch (error) {
                console.log(error)

            }


        }

    })


    return (
        <Layout>
            <div className="flex w-full max-w-[75rem]  shadow-2xl rounded-lg bg-[#e5e5e5]">
                <form
                    action=""
                    className="flex flex-col justify-center items-center w-full gap-5 rounded-lg"
                    onSubmit={handleSubmit}
                >
                    <p className="text-2xl font-bold mb-8 text-center">Inicio Sesión</p>
                    <div className="flex flex-col gap-1 w-1/2">
                        <Label>Email</Label>
                        <Input
                            label="userName"
                            variant="flat"
                            name="userName"
                            value={userName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            placeholder="Introduzca su usuario"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <Label>Password</Label>
                        <Input
                            label="Password"
                            placeholder="*******"
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            variant="flat"
                        />
                    </div>
                    <button type="submit" className="w-[18em] p-2 mt-4 text-[#ffff] cursor-pointer bg-[#007BFF] rounded-sm  hover:bg-[#007bff92] ">
                        Iniciar sesión
                    </button>
                </form>
                <img
                    src="https://docenzia.com/blog/wp-content/uploads/2023/04/que-se-necesita-para-trabajar-en-una-farmacia.jpg"
                    alt="Farmacia"
                    className="object-cover rounded-r-lg  w-[50%]"
                />
                {/* Lado derecho: Imagen */}
            </div>
        </Layout >
    )
}

export default LoginAuth
