import React from 'react'
import { Link, useNavigate } from "react-router-dom";
// import adminService from "../services/adminService";
import { useAuth } from '../context/AuthContext';


function AdminSidebar() {
    const navigate = useNavigate();
     const { logout } = useAuth();

    const handleLogout=async()=>{
        await logout();
        navigate("/");
        }

    return (
        <div>
            <Link to='/admin/dashboard'>Dashboard</Link>
            <Link to='/admin/manage-officers'>Officers</Link>
            <Link to='/admin/manage-users'>Users</Link>
            <Link to='/admin/manage-issues'>Issues</Link>
            <Link to='/admin/reports'>Reports</Link>
            <Link to='/analytics'>Analytics</Link>
            <p onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</p>
        </div>
    )
}
export default AdminSidebar;