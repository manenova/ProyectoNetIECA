import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IP_SERVER } from "../../constants";

const NewModalCalificacion = ({ isOpen, onClose, onUpdate }) => {

    const [materias, setMaterias] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [selectedMaterias, setSelectedMaterias] = useState([]);
    const [selectedAlumnoId, setSelectedAlumnoId] = useState('');

    useEffect(() => {
        fetchMaterias();
        fetchAlumnos();
    }, []);


    useEffect(() => {
        fecthMisMaterias();
    }, [selectedAlumnoId]);

    const fetchMaterias = async () => {
        try {
            const response = await axios.get(`${IP_SERVER}/Materias`);
            setMaterias(response.data);
        } catch (error) {
            console.error('Error fetching materias:', error);
        }
    };


    const fetchAlumnos = async () => {
        try {
            const response = await axios.get(`${IP_SERVER}/Alumnos`);
            setAlumnos(response.data);
        } catch (error) {
            console.error('Error fetching materias:', error);
        }
    };



    const fecthMisMaterias = async () => {
        try {
            const response = await axios.get(`${IP_SERVER}/Materias/mismaterias/${selectedAlumnoId}`);
            console.log(response.data);
            setSelectedMaterias(response.data);
        } catch (error) {
            console.error('Error fetching mis materias:', error);
        }
    }

    const handleAssignMaterias = async (materia) => {
        try {
            await axios.post(`${IP_SERVER}/Calificaciones/save`, {
                alumnoId: selectedAlumnoId,
                materiaId: materia.materiaId,
                profesorId: materia.profesorId,
                calificacion1: 0
            });
        } catch (error) {
            console.error('Error assigning materias:', error);
        }
    };

    const handleDeleteMaterias = async (materia) => {
        try {
            await axios.delete(`${IP_SERVER}/Calificaciones/delete?alumnoId=${selectedAlumnoId}&materiaId=${materia.materiaId}&profesorId=${materia.profesorId}`);
            console.log('Calificación eliminada correctamente');
            return true;
        } catch (error) {
            console.error('Error assigning materias:', error);
            return false;
        }
    }

    const toggleMateriaSelection = (materia) => {
        console.log(materia);
        const isMateriaSelected = selectedMaterias.some(
            selected => selected.materiaId === materia.materiaId
        );

        if (isMateriaSelected) {
            if (handleDeleteMaterias(materia)) {
                setSelectedMaterias(
                    selectedMaterias.filter(selected => selected.materiaId !== materia.materiaId)
                );
                console.log("quitar");
            }

        } else {
            setSelectedMaterias([...selectedMaterias, materia]);
            console.log("agregar");
            handleAssignMaterias(materia);
        }
    };

    const handleClose = () => {
        setMaterias([]);
        setSelectedMaterias([]);
        onClose();
    };

    const handleChange = (e) => {
        setSelectedAlumnoId(e.target.value);
       
    }

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
            <div className="bg-white w-full max-w-md p-6 rounded-md z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Asignar Materias</h3>
                    <button type="button" className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center" onClick={handleClose}>
                        X
                    </button>
                </div>
                <form onSubmit={handleAssignMaterias}>

                    <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alumno</label>
                        <select value={selectedAlumnoId} onChange={handleChange} className="border rounded-lg px-4 py-2">
                            <option value="">Seleccionar un alumno</option>
                            {alumnos.map((alumno) => (
                                <option key={alumno.alumnoId} value={alumno.alumnoId} >
                                    {alumno.nombre} {alumno.apellido}
                                </option>
                            ))}
                        </select>

                        
                    </div>

                    <hr />

                    <div className="grid gap-4 mb-4 grid-cols-2">
                        {materias.map(materia => (
                            <div className="col-span-2" key={materia.materiaId}>
                                <input
                                    type="checkbox"
                                    id={materia.materiaId}
                                    checked={selectedMaterias.some(
                                        selected => selected.materiaId === materia.materiaId
                                    )}
                                    onChange={() => toggleMateriaSelection(materia)}
                                />
                                <label htmlFor={materia.materiaId}>{materia.nombre}</label>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Asignar Materias
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewModalCalificacion;