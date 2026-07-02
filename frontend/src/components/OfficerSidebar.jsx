import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function OfficerSidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();


    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    return (
        <div>
            <Link to='/officer/dashboard'>Dashboard</Link>
            <Link to='/officer/manage-issues'>Issues</Link>
            <Link to='/officer/map'>Map</Link>
            <Link to='/officer/analytics'>Analytics</Link>
            <p onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</p>
        </div>
    )
}
export default OfficerSidebar;