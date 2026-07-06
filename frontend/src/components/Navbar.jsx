// adithya 

import React from "react";
import { Link, } from "react-router-dom";

function Navbar() {
    return (
        <header>
            <nav className="navbar">
                <div className="nav-left">
                    <Link to="/">Home</Link> {/*Here we could put logo instead of anker tag */}
                </div>
                <div className="nav-center">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/allissues">All Issues</Link>
                    <Link to="/report">Report</Link>
                </div>
                <div className="nav-right">
                    <Link to="/profile">Profile</Link>
                    <Link to="/analytics">Analytics</Link>
                    <Link to="/login">Logout</Link> {/* this is the proper version  i guess */}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;