import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IP_SERVER } from "../../constants";

const EditModalCalificacion = ({ isOpen, onClose, onUpdate, initialCalificacionData }) => {

    const [calificacion, setCalificacion] = useState('');
    const [nombreAlumno, setNombreAlumno] = useState('');
    const [nombreMateria,setNombreMateria] = useState('');
    const [nombreMaestro, setNombreMaestro] = useState('');

    useEffect(() => {
        if (initialCalificacionData) {
            setCalificacion(initialCalificacionData.calificacion1)
            setNombreAlumno(initialCalificacionData.nombreAlumno);
            setNombreMateria(initialCalificacionData.nombreMateria);
            setNombreMaestro(initialCalificacionData.nombreProfesor);
        }
    }, [initialCalificacionData]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${IP_SERVER}/Calificaciones/edit`, {
                alumnoId: initialCalificacionData.alumnoId,
                materiaId: initialCalificacionData.materiaId,
                profesorId: initialCalificacionData.profesorId,
                calificacion1: calificacion
            });
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error updating Materia:', error);
        }
    };

    const handleClose = () => {
        setCalificacion('')
        setNombreAlumno('');
        setNombreMateria('');
        setNombreMaestro('');
        onClose();
    };


    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
            <div className="bg-white w-full max-w-md p-6 rounded-md z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Actualizar Calificaci&oacute;n</h3>
                    <button type="button" className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center" onClick={handleClose}>
                        X
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre Alumno:</label>
                            <input
                                type="text"
                                value={nombreAlumno}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""
                                disabled
                                placeholder="Nombre alumno" />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre Profesor:</label>
                            <input
                                type="text"
                                value={nombreMaestro}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""
                                disabled
                                placeholder="Nombre profesor" />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre Materia:</label>
                            <input
                                type="text"
                                value={nombreMateria}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""
                                disabled
                                placeholder="Nombre materia" />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Calificaci&oacute;n (1-10):</label>
                            <input
                                type="text"
                                value={calificacion}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""
                                onChange={(e) => setCalificacion(e.target.value)}
                                placeholder="Nombre materia" />
                        </div>

                        

                    </div>
                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Guardar cambios
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditModalCalificacion;