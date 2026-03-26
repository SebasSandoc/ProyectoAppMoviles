import React, {Children, createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider  = ({children}) => {
    const [usuario, setUsuario] = useState(null);

    const login = (email, password) => {
        if (email === "correo" && password === "1234") {
            setUsuario({email});
            return true;
            
        }
        return false;
    };

    const logout = () => {
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value = {{usuario, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};