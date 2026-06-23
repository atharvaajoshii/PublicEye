import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios"

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const register = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                name, email, password
            })
            console.log(res.data)
            alert("registered!!")
            navigate('/')
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }

    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={register}>
                <input type="text" name="name" placeholder="name" onChange={(e) => setName(e.target.value)} required />
                <input type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
                <Link to={"/"}>dont have an account</Link>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default Register