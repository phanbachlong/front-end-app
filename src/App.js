import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './features/Layout/Layout';
import Login from './features/Login/Login';
import Register from './features/Register/Register';

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path='/' element={<Layout />}>
        {AppRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

    </Routes>
  );
}

export default App;
