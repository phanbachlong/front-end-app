import './App.css';
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
