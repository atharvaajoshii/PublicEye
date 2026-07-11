import Sidebar from "../components/Sidebar";
import React from "react";
import { Link } from "react-router-dom";


function Landing() {
    return (
        <div>
            <Sidebar />
            <h1>landing</h1>
            <br />
            <Link to={"/login"}>login</Link>
            <br />
            <Link to={"/register"}>register</Link>
        </div>
    )
}
export default Landing;