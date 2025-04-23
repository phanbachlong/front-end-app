import Group from "./features/Group/Group";
import Home from "./features/Home/Home";
import Profile from "./features/User/Profile";


const AppRoutes = [
    {
        path: "groups",
        element: <Group />
    },

    {
        path: "home",
        element: <Home />
    },

    {
        path: "profile",
        element: <Profile />
    }

]

export default AppRoutes;