import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogoutBtn = (e) =>{
        localStorage.clear();
        dispatch(logout());
        navigate('/')
    }

    return(
        <button className="btn logout-btn" onClick={handleLogoutBtn}>
            Logout
        </button>
    )
}

export default Logout;