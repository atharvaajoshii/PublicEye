import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoHomeSharp, IoLogOutSharp } from "react-icons/io5";
import { GoIssueTracks, GoReport } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import MyReports from "../pages/MyReports";
import toast from 'react-hot-toast';
import smallLogo from "../assets/small_logo.jpeg"
import "../styles/adithya_css/adithya.css"
import "../styles/atmika.css"

function Sidebar({ isOpen, closeSidebar }) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        closeSidebar();
        await logout();
        toast.success("logged out!")
        navigate("/");
    };

    const guestLinks = [
        { name: "Home", path: "/", icon: <IoHomeSharp /> },
        { name: "All Issues", path: "/all-issues", icon: <GoIssueTracks /> },
        { name: "Login", path: "/login", icon: <CgProfile /> },
        { name: "Register", path: "/register", icon: <CgProfile /> },
    ];

    const citizenLinks = [
        { name: "Home", path: "/dashboard", icon: <IoHomeSharp /> },
        // { name: "Dashboard", path: "/dashboard", icon: <AiOutlineDashboard /> },
        { name: "All Issues", path: "/all-issues", icon: <GoIssueTracks /> },
        { name: "Report", path: "/report", icon: <GoReport /> },
        // { name: "My Reports", path: "/myreports", icon: <GoReport/> },
        { name: "Profile", path: "/profile", icon: <CgProfile /> },
        { name: "Analytics", path: "/analytics", icon: <AiOutlineDashboard /> }, // Placeholder
    ];

    const officerLinks = [
        { name: "Dashboard", path: "/officer/dashboard", icon: <AiOutlineDashboard /> },
        { name: "Issues", path: "/officer/manage-issues", icon: <GoIssueTracks /> },
        { name: "Map", path: "/officer/map", icon: <GoIssueTracks /> }, // Placeholder
        { name: "Analytics", path: "/analytics", icon: <AiOutlineDashboard /> }, // Placeholder
    ];

    const adminLinks = [
        { name: "Dashboard", path: "/admin/dashboard", icon: <AiOutlineDashboard /> },
        { name: "Officers", path: "/admin/manage-officers", icon: <CgProfile /> }, // Placeholder
        { name: "Users", path: "/admin/manage-users", icon: <CgProfile /> }, // Placeholder
        { name: "Issues", path: "/admin/manage-issues", icon: <GoIssueTracks /> },
        { name: "Reports", path: "/admin/reports", icon: <GoReport /> },
        { name: "Analytics", path: "/analytics", icon: <AiOutlineDashboard /> }, // Placeholder
    ];

    let links = guestLinks;

    if (user?.role === "citizen") {
        links = citizenLinks;
    } else if (user?.role === "officer") {
        links = officerLinks;
    } else if (user?.role === "admin") {
        links = adminLinks;
    }

    return (
        <aside
            className={`sidebar ${isOpen ? "open" : "collapsed"
                }`}
        >
            {/* Logo */}
            <div className="sidebar-header">
                <img
                    src={smallLogo}
                    alt="PublicEye"
                    className="sidebar-logo"
                />

                <div className="sidebar-title">
                    <h2>PublicEye</h2>
                    <p>Citizen Portal</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-links">
                {links.map((link) => (
                    <Link key={link.path} to={link.path}
                        className="sidebarLinkChild"
                        onClick={closeSidebar}
                    >
                        {link.icon}
                        <span className="sidebar-text">
                            {link.name}
                        </span>
                    </Link>
                ))}
                <div className="sidebar-divider"></div>
                {/* Profile */}
                <div className="sidebar-user">
                    <img
                        src="https://placehold.co/50x50"
                        alt="Profile"
                        className="profile-image"
                    />

                    <div className="user-info">
                        <h4>{user?.name || "Guest"}</h4>
                        <p>{user?.role || "Visitor"}</p>
                    </div>
                </div>
            </nav>

            {/* Logout (Only when logged in) */}
            {user && (
                <div className="sidebar-footer">
                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                    >
                        <IoLogOutSharp />
                        <span>Logout</span>
                    </button>
                </div>
            )}

        </aside>
    );
}

export default Sidebar;