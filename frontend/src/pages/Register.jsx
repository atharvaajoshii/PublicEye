import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from 'react-hot-toast';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { register } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({
                name, email, password
            })
            toast.success("user registered successfully")
            navigate('/login')
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }

    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder="name" onChange={(e) => setName(e.target.value)} required />
                <input type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
                <Link to={"/login"}>already have an account!</Link>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default Register;