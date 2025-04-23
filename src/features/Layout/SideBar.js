import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AppRoutes from "../../AppRoutes";
import Logout from "../Login/Logout";

const SideBar = () => {
    return (
        <div >
            <div className="sideBar">
                <Link to="/groups">Groups</Link>
                <Link to="/profile">Profile</Link>
            </div>

            <Logout></Logout>
            <Routes>
                {AppRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </div>
    )
}

export default SideBar;