import React from 'react'
import { Link } from "react-router-dom"

function AdminSidebar() {
    return (
        <div>
            <Link to='/admin/dashboard'>Dashboard</Link>
            <Link to='/admin/manage-officers'>Officers</Link>
            <Link to='/admin/manage-users'>Users</Link>
            <Link to='/admin/manage-issues'>Issues</Link>
            <Link to='/admin/reports'>Reports</Link>
            <Link to='/admin/analytics'>Analytics</Link>
            <Link to='#'>Logout</Link>
        </div>
    )
}
export default AdminSidebar;