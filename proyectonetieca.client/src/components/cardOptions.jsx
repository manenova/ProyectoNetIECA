import React from 'react';
import { Link } from 'react-router-dom';

const CardOptions = () => {
    const cardLabels = ['Profesores', 'Materias', 'Alumnos', 'Calificaciones'];
    const cardRoutes = ['/profesores', '/materias', '/alumnos', '/calificaciones'];

    // Array de URLs de imágenes correspondientes a cada tarjeta
    const cardImages = [
        'https://clipart-library.com/images_k/teacher-transparent/teacher-transparent-16.png', // Imagen de ejemplo para Profesores
        'https://th.bing.com/th/id/OIP.tyw_WantWnadCuB56GfC6QHaGt?rs=1&pid=ImgDetMain', // Imagen de ejemplo para Materias
        'https://th.bing.com/th/id/R.de2f0484bb5a8f52f0ad32ca3eebe072?rik=XoqyH9ctqnmaug&riu=http%3a%2f%2fpngimg.com%2fuploads%2fstudent%2fstudent_PNG62540.png&ehk=ib%2bt5OfR8u06%2bZYs8svT3PVERnjby5oe1nvSzqvBl64%3d&risl=&pid=ImgRaw&r=0', // Imagen de ejemplo para Alumnos
        'https://th.bing.com/th/id/OIP.Jr-9WDxS3RZAhxmjUToGtwHaHa?rs=1&pid=ImgDetMain', // Imagen de ejemplo para Calificaciones
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-4">Opciones del Sistema Escolar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cardLabels.map((label, index) => (
                    <Link
                        to={cardRoutes[index]}
                        key={label}
                        className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        {/* Contenedor para la imagen */}
                        <div className="w-full h-40 overflow-hidden">
                            {/* Imagen para la tarjeta */}
                            <img src={cardImages[index]} alt={label} className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-gray-100 p-4">
                            <h3 className="text-xl font-semibold mb-2">{label}</h3>
                            <p className="text-gray-600">
                                {label === 'Profesores'
                                    ? "Crear, eliminar y actualizar datos generales de profesores"
                                    : label === 'Materias'
                                        ? "Crear, eliminar y actualizar datos generales de materias"
                                        : label === 'Alumnos'
                                            ? "Crear, eliminar y actualizar datos generales de alumnos"
                                            : "Consulta y administra las calificaciones."}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CardOptions;