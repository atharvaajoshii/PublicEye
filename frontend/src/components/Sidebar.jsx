// adithya
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
        const Click = () => {
            setIsOpen(!isOpen); // basically this is the not gate button when we click it changes to the other state 
        }
    return (
        <div className={isOpen ? "sidebar open" : "sidebar"}> {/*  basically what happens heres is that if isOpen is true only then will sidebaropen be used else sidebar is used it is toggled here but funciton is click This is called the ternary operator.*/}
            <button onClick={Click}>
                Toggle
            </button>
            <Link to="/">Icon{isOpen ? "Home" : ""}</Link>
            <Link to="/dashboard"> Icon {isOpen ? "Dashboard" : ""}</Link> {/*  {isOpen && <span>Dashboard</span>}   this is the better version of it */}
            <Link to="/allissues">Icon {isOpen ? "All Issues" : ""}</Link>
            <Link to="/report">Icon {isOpen ? "Report" : ""}</Link>
            <Link to="/profile">Icon {isOpen ? "Profile" : ""}</Link>
            <Link to="/login">Icon {isOpen ? "Logout" : ""}</Link>
        </div>
    )
}
export default Sidebar;