import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import "../styles/atmika.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      toast.success("logged in as " + res.user.name);
      console.log("login successful");
      if (res.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.user.role === "officer") {
        navigate("/officer/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div>
      <div className="auth-page">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to PublicEye.</p>

          <form onSubmit={handleLogin} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link className="auth-link" to="/register">
              Don't have an account?
            </Link>

            <button className="auth-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
