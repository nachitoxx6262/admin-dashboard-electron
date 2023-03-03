
import { Routes, Route, Link } from 'react-router-dom';
import Clients from '../components/Clientes/Clients';
import RegisterFamily from '../components/Registrar/RegisterFamily';
import RegisterFactory from '../components/Registrar/RegisterFactory';
import FormsFirebase from '../components/Auth/FormsFirebase';
import NaDni from '../components/Registrar/NaDni';

import './App.css';

function App() {
  return (
    <div>
      <Link to="/">
        <h1>Bienvenido</h1>
      </Link>
      <Routes>
        <Route path="/" element={<FormsFirebase />} />
        <Route path="/client" element={<Clients />} />
        <Route path="/clientfamily" element={<RegisterFamily />} />
        <Route path="/registercompany" element={<RegisterFactory />} />
        <Route path="/client/sindni" element={<NaDni />} />
      </Routes>
    </div>
  );
}

export default App;
