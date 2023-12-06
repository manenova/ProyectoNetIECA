import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Header from './components/header';
import CardOptions from './components/cardOptions';
import ViewAlumnos from './pages/ViewAlumnos';
import ViewProfesores from './pages/ViewProfesores';
import ViewMaterias from './pages/ViewMaterias';

function App() {
   
    return (
       
        <BrowserRouter>
            <div className="font-family-karla">
                <Header></Header>
                <CardOptions></CardOptions>
                <hr></hr>
                <Routes>
                    <Route path="/alumnos" exact element={<ViewAlumnos />} />
                    <Route path="/profesores" exact element={<ViewProfesores />} />
                    <Route path="/materias" exact element={<ViewMaterias/>} />

                </Routes>
            </div>
        </BrowserRouter>
       
       
    );
  
}

export default App;