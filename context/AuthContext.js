import React, {Children, createContext, useState} from 'react';
import { obtenerUsuarioCorreo } from '../services/usuarioService';

//contexto de autorizacion

export const AuthContext = createContext();

export const AuthProvider  = ({children}) => {
    const [usuario, setUsuario] = useState(null);

    //login para acceder a las pantallas principales
    const login = async (email,password) =>{
        try {

            //buscar si el correo ya esta registrado
            const usuarioDB = await obtenerUsuarioCorreo(email);
            if (!usuarioDB) {
                console.log("No encontrado")
                return false
            }
            
            //comprobar si la contraseña ingresada es correcta
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

    //cerrar sesion
    const logout = () => {
        setUsuario(null);
    };
    //retornar si el usuario es valido 
    return (
        <AuthContext.Provider value = {{usuario, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};