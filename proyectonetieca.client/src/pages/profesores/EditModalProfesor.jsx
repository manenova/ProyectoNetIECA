import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IP_SERVER } from "../../constants";

const EditModalProfesor = ({ ProfesorId, isOpen, onClose, onUpdate, initialProfesorData }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [perfil, setPerfil] = useState('');
    const [puesto, setPuesto] = useState('');

    useEffect(() => {
        // Al cargar el componente, establecer los datos iniciales del Profesor en el formulario
        if (initialProfesorData) {
            setNombre(initialProfesorData.nombre);
            setApellido(initialProfesorData.apellido);
            setEmail(initialProfesorData.email);
            setPerfil(initialProfesorData.perfil);
            setPuesto(initialProfesorData.puesto);

        }
    }, [initialProfesorData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${IP_SERVER}/Profesores/edit`, {
                ProfesorId,
                nombre,
                apellido,
                email,
                perfil,
                puesto,
                "calificacions": [],
                "materia": []
            });
            onUpdate(); // Actualizar lista después de la edición
            onClose(); // Cerrar modal
        } catch (error) {
            console.error('Error updating Profesor:', error);
        }
    };

    const handleClose = () => {
        setNombre('');
        setApellido('');
        setEmail('');
        setPerfil('');
        setPuesto('');
        onClose(); // Cerrar modal
    };
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
            <div className="bg-white w-full max-w-md p-6 rounded-md z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Editar Profesor: {ProfesorId}</h3>
                    <button type="button" className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center" onClick={handleClose}>
                        X
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input
                                type="text"
                                value={nombre}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Nombre" />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                            <input
                                type="text"
                                value={apellido}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""
                                onChange={(e) => setApellido(e.target.value)}
                                placeholder="Apellido" />
                        </div>

                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input
                                type="text"
                                value={email}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email" />
                        </div>

                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Perfil</label>
                            <input
                                type="text"
                                value={perfil}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""
                                onChange={(e) => setPerfil(e.target.value)}
                                placeholder="Perfil" />
                        </div>

                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Puesto</label>
                            <input
                                type="text"
                                value={puesto}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""
                                onChange={(e) => setPuesto(e.target.value)}
                                placeholder="Puesto" />
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

export default EditModalProfesor;