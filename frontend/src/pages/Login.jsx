import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
           const res = await login({
                email, password
            },
                {
                    withCredentials: true
                }
            )
            alert("login successful")
            if (res.user.role === "admin") {
                navigate("/admin/dashboard");
            } else if (res.user.role === "officer") {
                navigate("/officer/dashboard");
            } else {
                navigate("/profile");
            }
            
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="text" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <Link to={"/register"}>dont have an account</Link>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login