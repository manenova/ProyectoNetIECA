import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo';

const Header = () => {
    return (
        <header className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link to="/" className="flex items-center">
                        <Logo/>
                        <span className="text-white text-lg font-bold">Sistema Escolar</span>
                    </Link>
                </div>
                {/* Menús */}
                <nav className="md:ml-auto">
                    <ul className="flex space-x-4 text-white">
                        <li>
                            <Link to="/profesores" className="hover:underline">
                                Iniciar Sesi&oacute;n
                            </Link>
                        </li>
                        <li>
                            <Link to="/materias" className="hover:underline">
                                Costos
                            </Link>
                        </li>
                        <li>
                            <Link to="/alumnos" className="hover:underline">
                                Nosotros
                            </Link>
                        </li>
                 
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;