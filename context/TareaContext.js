import React, {createContext, useState} from 'react';

export const TareaContext = createContext();

export const TareaProvider = ({children}) => {

    const [agenda, setAgenda] = useState([]);

    const agregarTarea = (tarea) => {
        setAgenda([...agenda,producto]);
    };

    const eliminarTarea = (id) => {
        setAgenda(agenda.filter(p => p.id !== id));
    };

    return (
        <TareaContext.Provider value={{
            agenda,
            agregarTarea,
            eliminarTarea,
        }}>
            {children}
        </TareaContext.Provider>
    );

};