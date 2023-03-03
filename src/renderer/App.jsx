import { useRoutes } from 'react-router-dom';
import Clients from '../components/Clientes/Clients';
import RegisterFamily from '../components/Registrar/RegisterFamily';
import RegisterFactory from '../components/Registrar/RegisterFactory';
import FormsFirebase from '../components/Auth/FormsFirebase';
import NaDni from '../components/Registrar/NaDni';

import './App.css';

const routes = [
  { path: '/client', element: <Clients /> },
  { path: '/clientfamily', element: <RegisterFamily /> },
  { path: '/registercompany', element: <RegisterFactory /> },
  { path: '/', element: <FormsFirebase /> },
  { path: '/client/sindni', element: <NaDni /> },
];
function App() {
  const element = useRoutes(routes);

  return element;
}

export default App;
