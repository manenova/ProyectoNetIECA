import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSchool } from '@fortawesome/free-solid-svg-icons';
import { IP_SERVER } from "../constants";
import axios from 'axios';
import EditModalAlumno from './alumnos/EditModalAlumno';
import NewModalAlumno from './alumnos/NewModalAlumno';
import Loader from '../components/loader';
import AssignModalMaterias from './materias/AssignModalMateria';


function ViewAlumnos() {
    const [alumnos, setAlumnos] = useState();
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [assignAlumno, setAssignAlumno] = useState(null);

    const [newAlumno, setNewAlumno] = useState(null);

    useEffect(() => {
        populateAlumnosData();
    }, []);

    const handleDelete = async (alumnoId) => {
        try {

            await axios.delete(`${IP_SERVER}/Alumnos/delete/${alumnoId}`);
            // Actualiza la lista de alumnos después de la eliminación
            populateAlumnosData();
        } catch (error) {
            console.error('Error deleting alumno:', error);
        }
    };

    const handleEdit = (alumno) => {
        setSelectedAlumno(alumno);
    };

    const handleAssign = (alumnoId) => {
        setAssignAlumno(alumnoId);
    };


    const handleCloseModal = () => {
        setSelectedAlumno(null);
        setAssignAlumno(null);
    };

    const handleUpdate = () => {
        populateAlumnosData();
    };

    const contents = alumnos === undefined
        ? <Loader></Loader>
        : (
            <table className="table-auto border-collapse w-full mt-4">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Apellido</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Grado</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map(alumno =>
                        <tr key={alumno.alumnoId} className="border-b">
                            <td className="px-4 py-2">{alumno.alumnoId}</td>
                            <td className="px-4 py-2">{alumno.nombre}</td>
                            <td className="px-4 py-2">{alumno.apellido}</td>
                            <td className="px-4 py-2">{alumno.email}</td>
                            <td className="px-4 py-2">{alumno.grado}</td>
                            <td className="px-4 py-2 flex items-center">
                                <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer mr-4" onClick={() => handleEdit(alumno)} />
                                <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer mr-4" onClick={() => handleDelete(alumno.alumnoId)} />
                                <FontAwesomeIcon icon={faSchool} className="text-purple-500 cursor-pointer" onClick={() => handleAssign(alumno.alumnoId)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mt-8 mb-4">Lista de Alumnos</h1>
            <button
                onClick={() => setNewAlumno(true)} // Función para activar la ventana modal para agregar un nuevo alumno
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
            >
                Agregar Nuevo Alumno
            </button>
            {contents}
            {selectedAlumno && (
                <EditModalAlumno
                    isOpen={selectedAlumno !== null}
                    onClose={handleCloseModal}
                    alumnoId={selectedAlumno.alumnoId}
                    onUpdate={handleUpdate}
                    initialAlumnoData={selectedAlumno}
                />
            )}

            {newAlumno && (
                <NewModalAlumno
                    isOpen={newAlumno !== null}
                    onClose={() => setNewAlumno(false)}
                    onUpdate={handleUpdate}
                />
            )}

            {assignAlumno && (
                <AssignModalMaterias
                    isOpen={setAssignAlumno !== null}
                    onClose={() => setAssignAlumno(false)}
                    onUpdate={handleUpdate}
                    alumnoId={assignAlumno}
                />
            )}

           
        </div>
    );

    async function populateAlumnosData() {
        const response = await fetch('Alumnos');
        const data = await response.json();
        setAlumnos(data);
    }
}

export default ViewAlumnos;