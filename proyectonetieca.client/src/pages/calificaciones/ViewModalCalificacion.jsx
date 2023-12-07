import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IP_SERVER } from "../../constants";

const ViewModalCalificacion = ({ isOpen, onClose, alumnoId }) => {

    const [materias, setSelectedMaterias] = useState([]);

    useEffect(() => {
        fecthMisMaterias();
    }, []);

    const fecthMisMaterias = async () => {
        console.log(`Alumno id:${alumnoId}`)
        try {
            const response = await axios.get(`${IP_SERVER}/Calificaciones/detail/${alumnoId}`);
            setSelectedMaterias(response.data);
        } catch (error) {
            console.error('Error fetching mis materias:', error);
        }
    }


    const handleClose = () => {
        setSelectedMaterias('')
        onClose();
    };


    return (

        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="relative p-4 w-full max-w-md max-h-full fixed inset-0 bg-gray-900 opacity-98">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                           Kardex
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                 
                    <div className="p-4 md:p-5">
                        <ul className="space-y-4 mb-4">
                            {materias.map((materia) => (
                                 <li key={materia.materiaId}>
                              
                                    <label htmlFor={materia.alumnoId} className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">Materia: {materia.nombreMateria}</div>
                                            <div className="w-full text-gray-500 dark:text-gray-400">Calificaci&oacute;n: {materia.calificacion1}</div>
                                        </div>
                                        {materia.calificacion1 >= 8 ? <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 ms-3 text-green-500 dark:text-gray-400"
                                            viewBox="0 0 20 15"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd" d="M10.293 4.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V16a1 1 0 11-2 0V7.414L5.707 9.707a1 1 0 11-1.414-1.414l4-4z" clipRule="evenodd"/></svg>: <svg className="w-4 h-4 ms-3 rotate-90 text-red-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" /></svg>}
                                        
                                    </label>
                                </li>
                            ))}

                         </ul>
                    </div>
                </div>
            </div>
        </div> 



    );
};

export default ViewModalCalificacion;