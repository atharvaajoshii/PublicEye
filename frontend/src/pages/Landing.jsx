import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiLogIn,
  FiSearch,
  FiFileText,
  FiCheckCircle,
  FiUsers,
  FiMapPin,
} from "react-icons/fi";

import logo from "../assets/logo.png";
import heroImg from "../assets/hero.png";
import report from "../assets/report_issue.png";
import analytics from "../assets/analytics.png";
import footer_logo from "../assets/logo_name_tagline.png";
import track from "../assets/track.png";
import { motion } from "framer-motion";
const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function Landing() {
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
          {/* LEFT */}

          <motion.div
            className="hero-content"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <span className="hero-tag">Community Powered Civic Reporting</span>

            <motion.h1 variants={fadeLeft}>
              See it.
              <br />
              Report it.
              <br />
              <span>Improve your city.</span>
            </motion.h1>

            <p>
              PublicEye empowers citizens to report civic issues, track their
              progress, and work together with local authorities to build
              cleaner, safer communities.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="primary-btn">
                <FiFileText />
                Report an Issue
              </Link>

              <Link to="/all-issues" className="secondary-btn">
                <FiSearch />
                Explore Reports
              </Link>
            </div>

            {/* <div className="community-row">
              <div className="avatar-stack">
                <img src="https://i.pravatar.cc/50?img=1" alt="" />

                <img src="https://i.pravatar.cc/50?img=5" alt="" />

                <img src="https://i.pravatar.cc/50?img=8" alt="" />

                <img src="https://i.pravatar.cc/50?img=11" alt="" />
              </div>

              <p>
                Join <strong>15,000+</strong> citizens making a difference.
              </p>
            </div> */}
          </motion.div>

          {/* RIGHT */}

          <motion.div
            className="hero-image"
            variants={fadeRight}
            initial="hidden"
            animate="visible"
            >
            <img src={heroImg} alt="PublicEye" />
          </motion.div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      {/* 
      <section className="stats-section">
        <div className="landing-container">
          <div className="stats-card">
            <div className="stat">
              <div className="stat-icon">
                <FiFileText />
              </div>

              <h2>15,000+</h2>

              <p>Reports Submitted</p>
            </div>

            <div className="stat">
              <div className="stat-icon">
                <FiCheckCircle />
              </div>

              <h2>89%</h2>

              <p>Resolved Issues</p>
            </div>

            <div className="stat">
              <div className="stat-icon">
                <FiUsers />
              </div>

              <h2>250+</h2>

              <p>Active Communities</p>
            </div>

            <div className="stat">
              <div className="stat-icon">
                <FiMapPin />
              </div>

              <h2>45</h2>

              <p>Partner Authorities</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* ================= FEATURES ================= */}

      <section className="features-section" id="features">
        <div className="landing-container">
          <motion.div
            className="section-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            >
            <span>Why PublicEye?</span>

            <h2>
              Everything you need to keep your community informed and connected.
            </h2>

            <p>
              From reporting infrastructure issues to monitoring resolutions,
              PublicEye creates a transparent bridge between citizens and local
              authorities.
            </p>
          </motion.div>

          {/* Feature 1 */}

          <div className="feature-row">
            <motion.div
              className="feature-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeLeft}
              >
              <span className="feature-tag">Smart Reporting</span>

              <h3>Report issues in under a minute.</h3>

              <p>
                Upload photos, pinpoint the exact location on the map, choose a
                category, and submit your report instantly. Every report is
                organized for faster action.
              </p>

              <ul>
                <li>Precise map location</li>

                <li>Photo evidence</li>

                <li>Community voting</li>

                <li>Officer assignment</li>
              </ul>
            </motion.div>

            <motion.div
              className="feature-image i1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeRight}
              >
              <img src={report} alt="Report issue" />
            </motion.div>
          </div>

          {/* Feature 2 */}

          <div className="feature-row reverse">
            <motion.div
              className="feature-image i2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeLeft}
              >
              <img src={track} alt="Tracking" />
            </motion.div>

            <motion.div
              className="feature-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeRight}
              >
              <span className="feature-tag green">Transparency</span>

              <h3>Follow every report from start to finish.</h3>

              <p>
                Receive updates whenever an officer is assigned, the issue
                changes status, or a resolution is completed. No more wondering
                what happened.
              </p>

              <ul>
                <li>✔ Pending & Assigned updates</li>

                <li>✔ Resolution timeline</li>

                <li>✔ Officer progress</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="workflow-section" id="how">
        <div className="landing-container">
          <div className="section-heading">
            <span>How it Works</span>

            <h2>Four simple steps to improve your neighborhood.</h2>
          </div>

          <div className="workflow-grid">
            <motion.div
              className="workflow-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              >
              <div className="workflow-number">01</div>

              <h3>Submit a Report</h3>

              <p>
                Report a civic issue by adding a description, uploading
                supporting images, and marking its exact location on the map.
              </p>
            </motion.div>

            <motion.div
              className="workflow-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              >
              <div className="workflow-number green">02</div>

              <h3>Officer Assignment</h3>

              <p>
                Administrators review incoming reports and assign them to the
                appropriate officer for investigation and action.
              </p>
            </motion.div>

            <motion.div
              className="workflow-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              >
              <div className="workflow-number">03</div>

              <h3>Progress Tracking</h3>

              <p>
                Follow the report as officers provide updates and move the issue
                through its resolution stages in real time.
              </p>
            </motion.div>

            <motion.div
              className="workflow-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              >
              <div className="workflow-number green">04</div>

              <h3>Issue Resolved</h3>

              <p>
                Officers mark the issue as resolved, and the report is updated
                with its final status for public transparency.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= DASHBOARD PREVIEW ================= */}

      <section className="dashboard-preview">
        <div className="landing-container dashboard-grid">
          <motion.div
            className="dashboard-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeLeft}
            >
            <span className="feature-tag">Powerful Analytics</span>

            <h2>Everything you need to monitor your city.</h2>

            <p>
              Built-in analytics help authorities identify trends, monitor
              response times, evaluate officer performance, and prioritize the
              issues that matter most.
            </p>

            <div className="dashboard-points">
              <div>
                <h4>Issue Analytics</h4>

                <p>
                  Analyze reporting trends, issue categories, and community
                  engagement through interactive charts and visual insights.
                </p>
              </div>

              <div>
                <h4>Resolution Tracking</h4>

                <p>
                  Monitor every issue from submission to completion with
                  real-time status updates and resolution timelines.
                </p>
              </div>

              <div>
                <h4>Status-Based Workflow</h4>

                <p>
                Every report progresses through clearly defined stages, making it easy to monitor ongoing and completed civic issues.
                </p>
              </div>

            </div>
          </motion.div>

          <motion.div
            className="dashboard-image"
            initial={{
            opacity:0,
            scale:.9
            }}
            whileInView={{
            opacity:1,
            scale:1
            }}
            viewport={{
            once:true
            }}
            transition={{
            duration:.8
            }}
            >
            <img src={analytics} alt="Dashboard Preview" />
          </motion.div>
        </div>
      </section>
      {/* ================= CALL TO ACTION ================= */}

      <section className="cta-section">
        <div className="landing-container">
          <motion.div
            className="cta-card"
            initial={{
            opacity:0,
            y:80
            }}
            whileInView={{
            opacity:1,
            y:0
            }}
            viewport={{
            once:true
            }}
            transition={{
            duration:.8
            }}
            >
            <div className="cta-content">
              <span>Join the movement</span>

              <h2>Help build a cleaner, smarter and safer city.</h2>

              <p>
                Every report contributes to a more transparent, responsive, and
                connected community. Start making an impact today.
              </p>

              <div className="cta-buttons">
                <Link to="/register" className="primary-btn">
                  Create an Account
                </Link>

                <Link to="/login" className="secondary-btn">
                  Login
                </Link>
              </div>
            </div>

            <div className="cta-pattern">
              <div className="circle purple"></div>
              <div className="circle green"></div>
              <div className="circle light"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <motion.footer
        initial={{
        opacity:0
        }}
        whileInView={{
        opacity:1
        }}
        viewport={{
        once:true
        }}
        transition={{
        duration:1
        }} className="landing-footer" id="contact">
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
      </motion.footer>
    </div>
  );
}

export default Landing;
