import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { IoHomeSharp, IoLogOutSharp } from "react-icons/io5";
import { GoIssueTracks, GoReport } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { GrMap } from "react-icons/gr";
import { GiPoliceOfficerHead } from "react-icons/gi";

import logoName from "../assets/logo_name.png";
import logo from "../assets/logo.png";

import toast from "react-hot-toast";

import "../styles/atmika.css";

import adminAvatar from "../assets/admin.png";
import officerAvatar from "../assets/officer.png";
import citizenAvatar from "../assets/citizen.png";

function Sidebar({ isOpen, closeSidebar, toggleSidebar }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    closeSidebar();
    await logout();
    toast.success("logged out!");
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
    { name: "Map", path: "/map", icon: <GrMap /> },
    { name: "Profile", path: "/profile", icon: <CgProfile /> },
    { name: "Analytics", path: "/analytics", icon: <AiOutlineDashboard /> }, // Placeholder
  ];

  const officerLinks = [
    {
      name: "Dashboard",
      path: "/officer/dashboard",
      icon: <MdOutlineDashboard />,
    },
    { name: "Issues", path: "/officer/manage-issues", icon: <GoIssueTracks /> },
    { name: "Map", path: "/map", icon: <GrMap /> }, // Placeholder
    { name: "Analytics", path: "/analytics", icon: <AiOutlineDashboard /> }, // Placeholder
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <MdOutlineDashboard />,
    },
    {
      name: "Officers",
      path: "/admin/manage-officers",
      icon: <GiPoliceOfficerHead />,
    }, // Placeholder
    { name: "Users", path: "/admin/manage-users", icon: <CgProfile /> }, // Placeholder
    { name: "Issues", path: "/admin/manage-issues", icon: <GoIssueTracks /> },
    { name: "Map", path: "/officer/map", icon: <GrMap /> },
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

  const profileImage =
    user?.role === "admin"
      ? adminAvatar
      : user?.role === "officer"
        ? officerAvatar
        : user?.role === "citizen"
          ? citizenAvatar
          : citizenAvatar;

  return (
    <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      {/* Logo */}

      <button className="sidebar-logo-btn" onClick={toggleSidebar}>
        <img
          src={isOpen ? logoName : logo}
          alt="PublicEye"
          className="sidebar-logo"
        />
      </button>

      {/* Navigation */}
      <nav className="sidebar-links">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "sidebarLinkChild active" : "sidebarLinkChild"
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}

        {/* Profile */}
        <div className="sidebar-user">
          <img
            src={profileImage}
            alt={user?.role || "Guest"}
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
          <button onClick={handleLogout} className="logout-btn">
            <IoLogOutSharp />
            <span>Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
