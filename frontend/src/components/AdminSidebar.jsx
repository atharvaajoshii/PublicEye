import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import adminService from "../services/adminService";

function AdminSidebar() {
    const navigate = useNavigate();

    const handleLogout=async()=>{
        await adminService.logout();
        navigate("/");
        }

    return (
        <div>
            <Link to='/admin/dashboard'>Dashboard</Link>
            <Link to='/admin/manage-officers'>Officers</Link>
            <Link to='/admin/manage-users'>Users</Link>
            <Link to='/admin/manage-issues'>Issues</Link>
            <Link to='/admin/reports'>Reports</Link>
            <Link to='/admin/analytics'>Analytics</Link>
            <p onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</p>
        </div>
    )
}
export default AdminSidebar;