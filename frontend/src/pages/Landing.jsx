import React from "react";
import { Link } from "react-router-dom";

function Landing() {
    return (
        <div>
            <Link to={"/login"}>login</Link>
            <br />
            <Link to={"/register"}>register</Link>
        </div>
    )
}
export default Landing;