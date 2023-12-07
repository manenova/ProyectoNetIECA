import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import CardOptions from './components/cardOptions';
import ViewAlumnos from './pages/ViewAlumnos';
import ViewProfesores from './pages/ViewProfesores';
import ViewMaterias from './pages/ViewMaterias';
import ViewCalificaciones from './pages/ViewCalificaciones';
import Login from './pages/Login';

function App() {
  
    return (
       
        <BrowserRouter>
            <div className="font-family-karla">
                <Header/>
                <CardOptions />
                <hr/>
                <Routes>
                    <Route path="/alumnos" exact element={<ViewAlumnos />} />
                    <Route path="/profesores" exact element={<ViewProfesores />} />
                    <Route path="/materias" exact element={<ViewMaterias />} />
                    <Route path="/calificaciones" exact element={<ViewCalificaciones />} />
                    <Route path="/login" exact element={<Login />}/>
                </Routes>
            </div>
        </BrowserRouter>
       
       
    );
  
}

export default App;