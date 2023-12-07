import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { IP_SERVER } from "../constants";
import axios from 'axios';
import EditModalCalificacion from './calificaciones/EditModalCalificacion';
import NewModalCalificacion from './calificaciones/NewModalCalificacion';
import Loader from '../components/loader';


function ViewCalificaciones() {

    const [calificaciones, setCalificacions] = useState();
    const [selectedCalificacion, setSelectedCalificacion] = useState(null);
    const [newCalificacion, setNewCalificacion] = useState(null);

    useEffect(() => {
        populateCalificacionsData();
    }, []);

    const handleDelete = async (alumnoId, materiaId, profesorId) => {
        try {

            await axios.delete(`${IP_SERVER}/Calificaciones/delete?alumnoId=${alumnoId}&materiaId=${materiaId}&profesorId=${profesorId}`);
            populateCalificacionsData();
        } catch (error) {
            console.error('Error deleting calificacion:', error);
        }
    };

    const handleEdit = (calificacion) => {
        setSelectedCalificacion(calificacion);
    };

    const handleCloseModal = () => {
        setSelectedCalificacion(null);
    };

    const handleUpdate = () => {
        populateCalificacionsData();
    };

    const contents = calificaciones === undefined
        ? <Loader></Loader>
        : (
            <table className="table-auto border-collapse w-full mt-4">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">Nombre Alumno</th>
                        <th className="px-4 py-2">Email Alumno</th>
                        <th className="px-4 py-2">Materia</th>
                        <th className="px-4 py-2">Profesor</th>
                        <th className="px-4 py-2">Email Profesor</th>
                        <th className="px-4 py-2">Calificaci&oacute;n</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {calificaciones.map(calificacion =>
                        <tr key={calificacion.calificacionId} className="border-b">
                            <td className="px-4 py-2">{calificacion.nombreAlumno}</td>
                            <td className="px-4 py-2">{calificacion.emailAlumno}</td>
                            <td className="px-4 py-2">{calificacion.nombreMateria}</td>
                            <td className="px-4 py-2">{calificacion.nombreProfesor}</td>
                            <td className="px-4 py-2">{calificacion.emailProfesor}</td>
                            <td className="px-4 py-2">{calificacion.calificacion1}</td>
                            <td className="px-4 py-2 flex items-center">
                                <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer mr-4" onClick={() => handleEdit(calificacion)} />
                                <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer mr-4" onClick={() => handleDelete(calificacion.alumnoId, calificacion.materiaId, calificacion.profesorId)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mt-8 mb-4">Lista de Calificacions</h1>
            <button
                onClick={() => setNewCalificacion(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
            >
                Agregar Nuevo Calificacion
            </button>
            {contents}
            {selectedCalificacion && (
                <EditModalCalificacion
                    isOpen={selectedCalificacion !== null}
                    onClose={handleCloseModal}
                    calificacionId={selectedCalificacion.calificacionId}
                    onUpdate={handleUpdate}
                    initialCalificacionData={selectedCalificacion}
                />
            )}

            {newCalificacion && (
                <NewModalCalificacion
                    isOpen={newCalificacion !== null}
                    onClose={() => setNewCalificacion(false)}
                    onUpdate={handleUpdate}
                />
            )}

        </div>
    );

    async function populateCalificacionsData() {
        const response = await fetch('Calificaciones/details');
        const data = await response.json();
        setCalificacions(data);
    }
}

export default ViewCalificaciones;