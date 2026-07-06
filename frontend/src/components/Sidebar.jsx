// adithya
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoHomeSharp,IoLogOutSharp } from "react-icons/io5";
import { GoIssueTracks,GoReport } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
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
            <Link to="/"><IoHomeSharp />{isOpen ? "Home" : ""}</Link>
            <Link to="/dashboard"> <AiOutlineDashboard />{isOpen ? "Dashboard" : ""}</Link> {/*  {isOpen && <span>Dashboard</span>}   this is the better version of it */}
            <Link to="/all-issues"><GoIssueTracks /> {isOpen ? "All Issues" : ""}</Link>
            <Link to="/report"><GoReport /> {isOpen ? "Report" : ""}</Link>
            <Link to="/profile"><CgProfile /> {isOpen ? "Profile" : ""}</Link>
            <Link to="/login"><IoLogOutSharp /> {isOpen ? "Logout" : ""}</Link>
        </div>
    )
}
export default Sidebar;