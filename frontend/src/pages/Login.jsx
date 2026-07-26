import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "../styles/atmika.css";

import logo from "../assets/logo.png";
import footer_logo from "../assets/logo_name_tagline.png";
import ButtonLoader from "../components/ButtonLoader";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { FiLogIn, FiFileText, FiSearch } from "react-icons/fi";

import heroImage from "../assets/hero.png";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`landing-header${scrolled ? " is-scrolled" : ""}`}>
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
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef(null);

  // Mouse parallax (foreground image reacts more than background)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const parallaxX = useSpring(rawX, { damping: 22, stiffness: 110 });
  const parallaxY = useSpring(rawY, { damping: 22, stiffness: 110 });

  const imageX = useTransform(parallaxX, [-1, 1], [-14, 14]);
  const imageY = useTransform(parallaxY, [-1, 1], [-10, 10]);

  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    },
    [prefersReducedMotion, rawX, rawY],
  );

  // Scroll parallax — background drifts slower than the foreground content
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgTopY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const bgBottomY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const animClass = (name) =>
    prefersReducedMotion ? "" : ` hero-anim-${name}`;

  // Requested load order: background -> hero image -> heading -> paragraph -> buttons
  const delays = {
    bg: 0,
    image: 0.15,
    tag: 0.32,
    heading: 0.42,
    copy: 0.58,
    buttons: 0.74,
  };

  return (
    <section
      className="hero"
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
    >
      {/* background enters first, then drifts on scroll independently of the foreground */}
      <div
        className={`hero-bg hero-bg--top${animClass("from-top")}`}
        aria-hidden="true"
      >
        <motion.div
          className="hero-bg-fill"
          style={{ y: prefersReducedMotion ? 0 : bgTopY }}
        />
      </div>
      <div
        className={`hero-bg hero-bg--bottom${animClass("from-bottom")}`}
        aria-hidden="true"
      >
        <motion.div
          className="hero-bg-fill"
          style={{ y: prefersReducedMotion ? 0 : bgBottomY }}
        />
      </div>

      <motion.div
        className="landing-container hero-grid"
        style={{ y: prefersReducedMotion ? 0 : contentY }}
      >
        <Registration />

        <div className="hero-visual">
          <motion.div
            className="hero-visual-parallax"
            style={{
              x: prefersReducedMotion ? 0 : imageX,
              y: prefersReducedMotion ? 0 : imageY,
            }}
          >
            <div
              className={`hero-image-frame${animClass("from-right")}`}
              style={{ animationDelay: `${delays.image}s` }}
            >
              <div className="hero-image-float">
                <img
                  src={heroImage}
                  alt="PublicEye app showing a reported civic issue"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Registration() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-page">
    <motion.div
  className="auth-card"
  initial={{ x: -120, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1], // smooth ease-out
  }}
>


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
        <button className="auth-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <ButtonLoader text="Logging in..." />
          ) : (
            "Login"
          )}
        </button>
      </form>
      </motion.div>
  </div>
  );
}

function Footer() {
  return (
    <footer className="landing-footer" id="contact">
      <div className="landing-container footer-grid">
        <div className="footer-brand">
          <img src={footer_logo} alt="PublicEye" />
          <p>
            Empowering communities by connecting citizens with local authorities
            through transparent, efficient, and collaborative civic reporting.
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
  );
}

function Login() {
  
  return (
    <div className="landing">
      {/* ================= NAVBAR ================= */}

      <Navbar/>
      {/* ================= HERO ================= */}

      <Hero/>



      <Footer/>

    </div>
  );
}


export default Login;