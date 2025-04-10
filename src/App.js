import logo from './logo.svg';
import './App.css';
import Register from './features/Register/Register'
import Login from './features/Login/Login'
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <Routes>
      {AppRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
