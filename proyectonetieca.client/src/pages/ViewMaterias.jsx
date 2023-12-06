import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IP_SERVER } from "../constants";
import axios from 'axios';
import EditModalMateria from './materias/EditModalMateria';
import NewModalMateria from './materias/NewModalMateria';
import Loader from '../components/loader';

const fetchProfesor = async (id) => {
    try {
        const response = await axios.get(`${IP_SERVER}/Profesores/details/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching profesor:', error);
        return null;
    }
};


function ViewMaterias() {

    const [Materias, setMaterias] = useState();
    const [selectedMateria, setSelectedMateria] = useState(null);
    const [newMateria, setNewMateria] = useState(null);
    const [profesoresData, setProfesoresData] = useState({});

    useEffect(() => {
        populateMateriasData();
    }, []);



    useEffect(() => {
        if (Materias) {
            const profesorIds = Materias.map((materia) => materia.profesorId);
            const uniqueProfesorIds = Array.from(new Set(profesorIds));
            const promises = uniqueProfesorIds.map((id) => fetchProfesor(id));

            Promise.all(promises).then((profesores) => {
                const profesoresMap = profesores.reduce((acc, profesor) => {
                    if (profesor) {
                        acc[profesor.profesorId] = `${profesor.nombre} ${profesor.apellido} `; 
                    }
                    return acc;
                }, {});
                setProfesoresData(profesoresMap);
            });
        }
    }, [Materias]);

    const handleDelete = async (MateriaId) => {
        try {

            await axios.delete(`${IP_SERVER}/Materias/delete/${MateriaId}`);
            populateMateriasData();
        } catch (error) {
            console.error('Error deleting Materia:', error);
        }
    };

    const handleEdit = (Materia) => {
        setSelectedMateria(Materia);
    };

    const handleCloseModal = () => {
        setSelectedMateria(null);
    };

    const handleUpdate = () => {
        populateMateriasData();
    };



    const contents = Materias === undefined
        ? <Loader></Loader>
        : (
            <table className="table-auto border-collapse w-full mt-4">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Descripci&oacute;n</th>
                        <th className="px-4 py-2">Profesor</th>
                        <th className="px-4 py-2">Acciones</th> {/* Columna de acciones */}
                    </tr>
                </thead>
                <tbody>
                    {Materias.map(Materia =>
                        <tr key={Materia.MateriaId} className="border-b">
                            <td className="px-4 py-2">{Materia.materiaId}</td>
                            <td className="px-4 py-2">{Materia.nombre}</td>
                            <td className="px-4 py-2">{Materia.descripcion}</td>
                            <td className="px-4 py-2">{profesoresData[Materia.profesorId]}</td>
                            <td className="px-4 py-2 flex items-center">
                                {/* Iconos de editar y eliminar */}
                                <FontAwesomeIcon icon={faEdit} className="text-blue-500 cursor-pointer mr-2" onClick={() => handleEdit(Materia)} />
                                <FontAwesomeIcon icon={faTrash} className="text-red-500 cursor-pointer" onClick={() => handleDelete(Materia.materiaId)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mt-8 mb-4">Lista de Materias</h1>
            <button
                onClick={() => setNewMateria(true)} // Función para activar la ventana modal para agregar un nuevo Materia
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4"
            >
                Agregar Nuevo Materia
            </button>
            {contents}
            {selectedMateria && (
                <EditModalMateria
                    isOpen={selectedMateria !== null}
                    onClose={handleCloseModal}
                    materiaId={selectedMateria.materiaId}
                    profesorId={selectedMateria.profesorId}
                    onUpdate={handleUpdate}
                    initialMateriaData={selectedMateria}
                />
            )}

            {newMateria && (
                <NewModalMateria
                    isOpen={newMateria !== null}
                    onClose={() => setNewMateria(false)}
                    onUpdate={handleUpdate}
                />
            )}

        </div>
    );

    async function populateMateriasData() {
        const response = await fetch('Materias');
        const data = await response.json();
        setMaterias(data);
    }
}

export default ViewMaterias;