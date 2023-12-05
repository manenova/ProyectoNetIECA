import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IP_SERVER } from "../constants";
import axios from 'axios';
import EditModalProfesor from './Profesores/EditModalProfesor';
import NewModalProfesor from './Profesores/NewModalProfesor';
import Loader from '../components/loader';

function ViewProfesores() {
    const [Profesores, setProfesores] = useState();
    const [selectedProfesor, setSelectedProfesor] = useState(null);
    const [newProfesor, setNewProfesor] = useState(null);

    useEffect(() => {
        populateProfesoresData();
    }, []);

    const handleDelete = async (ProfesorId) => {
        try {

            await axios.delete(`${IP_SERVER}/Profesores/delete/${ProfesorId}`);
            populateProfesoresData();
        } catch (error) {
            console.error('Error deleting Profesor:', error);
        }
    };

    const handleEdit = (Profesor) => {
        setSelectedProfesor(Profesor);
    };

    const handleCloseModal = () => {
        setSelectedProfesor(null);
    };

    const handleUpdate = () => {
        populateProfesoresData();
    };

    const contents = Profesores === undefined
        ? <Loader></Loader>
        : (
            <table className="table-auto border-collapse w-full mt-4">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Apellido</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Perfil</th>
                        <th className="px-4 py-2">Puesto</th>
                        <th className="px-4 py-2">Acciones</th> {/* Columna de acciones */}
                    </tr>
                </thead>
                <tbody>
                    {Profesores.map(Profesor =>
                        <tr key={Profesor.ProfesorId} className="border-b">
                            <td className="px-4 py-2">{Profesor.profesorId}</td>
                            <td className="px-4 py-2">{Profesor.nombre}</td>
                            <td className="px-4 py-2">{Profesor.apellido}</td>
                            <td className="px-4 py-2">{Profesor.email}</td>
                            <td className="px-4 py-2">{Profesor.perfil}</td>
                            <td className="px-4 py-2">{Profesor.puesto}</td>
                            <td className="px-4 py-2 flex items-center">
                                {/* Iconos de editar y eliminar */}
                                <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer mr-2" onClick={() => handleEdit(Profesor)} />
                                <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" onClick={() => handleDelete(Profesor.profesorId)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mt-8 mb-4">Lista de Profesores</h1>
            <button
                onClick={() => setNewProfesor(true)} // Función para activar la ventana modal para agregar un nuevo Profesor
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
            >
                Agregar Nuevo Profesor
            </button>
            {contents}
            {selectedProfesor && (
                <EditModalProfesor
                    isOpen={selectedProfesor !== null}
                    onClose={handleCloseModal}
                    ProfesorId={selectedProfesor.profesorId}
                    onUpdate={handleUpdate}
                    initialProfesorData={selectedProfesor}
                />
            )}

            {newProfesor && (
                <NewModalProfesor
                    isOpen={newProfesor !== null}
                    onClose={() => setNewProfesor(false)}
                    onUpdate={handleUpdate}
                />
            )}

        </div>
    );

    async function populateProfesoresData() {
        const response = await fetch('Profesores');
        const data = await response.json();
        setProfesores(data);
    }
}

export default ViewProfesores;