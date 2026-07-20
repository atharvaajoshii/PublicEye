import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; 
import toast from "react-hot-toast"; 
import "../styles/atmika.css";
import {
  FiLogIn,
} from "react-icons/fi";

import logo from "../assets/logo.png";
import heroImg from "../assets/hero.png";
import footer_logo from "../assets/logo_name_tagline.png";


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
    <div className="landing">
      {/* ================= NAVBAR ================= */}

      <header className="landing-header">
        <div className="landing-container">
          <Link to="/" className="landing-brand">
            <img src={logo} alt="PublicEye" />
          </Link>

          <nav className="landing-nav">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how">How it Works</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="landing-actions">
            <Link className="login-btn" to="/login">
              <FiLogIn />
              Login
            </Link>

            <Link className="report-btn" to="/register">
              Report an Issue
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="hero" id="home">
        <div className="landing-container hero-grid">

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


          <div className="hero-image">
            <img src={heroImg} alt="PublicEye" />
          </div>
        </div>
      </section>

            <footer className="landing-footer" id="contact">
              <div className="landing-container footer-grid">
                <div className="footer-brand">
                  <img src={footer_logo} alt="PublicEye" />
      
                  <p>
                    Empowering communities by connecting citizens with local
                    authorities through transparent, efficient, and collaborative
                    civic reporting.
                  </p>
                </div>
      
                <div className="footer-links">
                  <h4>Platform</h4>
      
                  <Link to="/">Home</Link>
      
                  <a href="#features">Features</a>
      
                  <a href="#how">How it Works</a>
      
                  <Link to="/all-issues">Explore Reports</Link>
                </div>
      
                <div className="footer-links">
                  <h4>Account</h4>
      
                  <Link to="/login">Login</Link>
      
                  <Link to="/register">Register</Link>
      
                  <Link to="/report">Report Issue</Link>
                </div>
      
                <div className="footer-links">
                  <h4>Contact</h4>
      
                  <Link to="https://github.com/atharvaajoshii/PublicEye">GitHub</Link>
      
                  <p>India</p>
                </div>
              </div>
      
              <div className="footer-bottom">
                <p>© {new Date().getFullYear()} PublicEye. All rights reserved.</p>
              </div>
            </footer>
    
      </div>
  );
}


  export default Login;