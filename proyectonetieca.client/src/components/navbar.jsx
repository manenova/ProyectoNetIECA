import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-white text-xl font-bold">
                            Sistema Escolar
                        </Link>
                    </div>
                    {/* Menú de navegación */}
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <Link
                                to="/profesores"
                                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                            >
                                Profesores
                            </Link>
                            <Link
                                to="/materias"
                                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                            >
                                Materias
                            </Link>
                            <Link
                                to="/alumnos"
                                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                            >
                                Alumnos
                            </Link>
                            <Link
                                to="/calificaciones"
                                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                            >
                                Calificaciones
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;