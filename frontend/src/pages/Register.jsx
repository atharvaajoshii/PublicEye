import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import "../styles/atmika.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({
        name,
        email,
        password,
      });
      toast.success("user registered successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <div className="auth-page">
        <div className="auth-card">
          <h1>Create Account</h1>
          <p className="auth-subtitle">
            Join PublicEye and start reporting community issues.
          </p>

          <form onSubmit={handleRegister} className="auth-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Link className="auth-link" to="/login">
              already have an account!
            </Link>

            <button className="auth-btn" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
