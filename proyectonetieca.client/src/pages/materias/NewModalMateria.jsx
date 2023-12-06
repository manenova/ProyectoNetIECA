    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { IP_SERVER } from "../../constants";

    const NewModalMateria = ({  isOpen, onClose, onUpdate }) => {

        const [nombre, setNombre] = useState('');
        const [descripcion, setDescripcion] = useState('');
        const [selectedProfesorId, setSelectedProfesorId] = useState('');

        const [profesores, setProfesores] = useState([]);


        useEffect(() => {
            fetchProfesores();
 
        }, []);
        
        const fetchProfesores = async () => {
            try {
                const response = await axios.get(`${IP_SERVER}/Profesores`);
                setProfesores(response.data);
            } catch (error) {
                console.error('Error fetching profesores:', error);
            }
        };


        const handleChange = (e) => {
            setSelectedProfesorId(e.target.value);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                await axios.post(`${IP_SERVER}/Materias/save`, {
                    nombre,
                    descripcion,
                    profesorId: selectedProfesorId
                });
                onUpdate();
                onClose();
            } catch (error) {
                console.error('Error saving Materia:', error);
            }
        };

        const handleClose = () => {
            setNombre('');
            setDescripcion('');
            setSelectedProfesorId('');
            onClose();
        };


        return (
            <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
                <div className="bg-white w-full max-w-md p-6 rounded-md z-10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Nueva Materia</h3>
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
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripci&oacute;n</label>
                                <input
                                    type="text"
                                    value={descripcion}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""
                                    onChange={(e) => setDescripcion(e.target.value)}
                                    placeholder="Descripci&oacute;n" />
                            </div>

                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profesor</label>
                                <select value={selectedProfesorId} onChange={handleChange} className="border rounded-lg px-4 py-2">
                                    <option value="">Seleccionar un profesor</option>
                                    {profesores.map((profesor) => (
                                        <option key={profesor.profesorId} value={profesor.profesorId} >
                                            {profesor.nombre} {profesor.apellido}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    export default NewModalMateria;