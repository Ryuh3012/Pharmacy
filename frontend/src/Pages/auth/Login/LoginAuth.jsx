import { Label } from "@heroui/react";
import Layout from "../Layout"
import { Input, Button } from "@heroui/react";

const LoginAuth = () => {
    return (
        <Layout>
            <div className="flex w-full max-w-[75rem]  shadow-2xl rounded-lg bg-[#e5e5e5]">
                <form action="" className="flex flex-col justify-center items-center w-full gap-5 rounded-lg">
                    <p className="text-2xl font-bold mb-8 text-center">Inicio Sesión</p>
                    <div className="flex flex-col gap-1 w-1/2">
                        <Label htmlFor="input-type-email">Email</Label>
                        <Input
                            placeholder="Usuario"
                            labelPlacement="outside"
                            variant="flat"
                            classNames={{ label: "text-white" }} />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <Label htmlFor="input-type-number">Age</Label>
                        <Input
                            label="Password"
                            placeholder="*******"
                            type="password"
                            labelPlacement="outside"
                            variant="flat"
                            classNames={{ label: "text-white" }}
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
