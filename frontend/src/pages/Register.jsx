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

        <div className="auth-layout">
      <div className="landing-container">
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


export default Register;