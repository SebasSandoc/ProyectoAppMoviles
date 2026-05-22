import React, {Children, createContext, useState} from 'react';
import { obtenerUsuarioCorreo } from '../services/usuarioService';

export const AuthContext = createContext();

export const AuthProvider  = ({children}) => {
    const [usuario, setUsuario] = useState(null);

    /*const login = (email, password) => {
        console.log(email+"-"+password)
        if (email === "correo" && password === "1234") {
            setUsuario({email});
            console.log("permitido")
            return true;         
        }
        console.log("no permitido")
        return false;
    };*/

    const login = async (email,password) =>{
        try {
            const usuarioDB = await obtenerUsuarioCorreo(email);
            if (!usuarioDB) {
                console.log("No encontrado")
                return false
            }

            if (usuarioDB.contrasenia == password){
                setUsuario(usuarioDB);
                console.log("acceso")
                return true
            }
        }catch{
            console.error("error de login: ",error)
            return false;
        }
    }

    const logout = () => {
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value = {{usuario, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};