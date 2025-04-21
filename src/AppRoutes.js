import Login from "./features/Login/Login";
import Register from "./features/Register/Register";
import Home from "./Home";


const AppRoutes = [
    {
        path: "/",
        element: <Login />
    },

    {
        path: "/login",
        element: <Login />
    },

    {
        path: "/register",
        element: <Register />
    },
    
    {
        path: "/home",
        element: <Home/>
    }
]

export default AppRoutes;