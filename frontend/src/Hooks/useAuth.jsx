import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                // Hacemos la petición a la ruta que creamos en Express
                const res = await axios.get('http://localhost:3000/auth/validate', {
                    withCredentials: true // 🔥 OBLIGATORIO: Envía la cookie httpOnly automáticamente
                });


                // Si el backend dice que es válido, guardamos los datos en el estado
                if (res.data.active) {
                    setUsuario(res.data.user);
                }
            } catch (error) {
                // Si da 401 o la cookie expiró, el usuario no está autenticado
                setUsuario(null);
            } finally {
                setCargando(false);
            }
        };

        verificarSesion();
    }, []);

    return {
        empleadoId: usuario ? Number(usuario.idUsuario) : null,
        usuario: usuario,
        estaAutenticado: !!usuario,
        cargando // ⏳ Útil para mostrar un "Cargando..." mientras el backend valida la cookie
    };
};