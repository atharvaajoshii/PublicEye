import React from "react";
import { Link } from "react-router-dom";


function Landing(){
    return(
        <div>
            <h1>ladning</h1>
            <br />
            <Link to={"/login"}>login</Link>
            <br />
            <Link to={"/register"}>register</Link>
        </div>
    )
}
export default Landing;