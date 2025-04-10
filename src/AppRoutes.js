import Login from "./features/Login/Login";
import Register from "./features/Register/Register";


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
    }
]

export default AppRoutes;