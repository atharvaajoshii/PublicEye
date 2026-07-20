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

          <div className="hero-content">
            <span className="hero-tag">Community Powered Civic Reporting</span>

            <h1>
              See it.
              <br />
              Report it.
              <br />
              <span>Improve your city.</span>
            </h1>

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
          </div>

          {/* RIGHT */}

          <div className="hero-image">
            <img src={heroImg} alt="PublicEye" />
          </div>
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
          <div className="section-heading">
            <span>Why PublicEye?</span>

            <h2>
              Everything you need to keep your community informed and connected.
            </h2>

            <p>
              From reporting infrastructure issues to monitoring resolutions,
              PublicEye creates a transparent bridge between citizens and local
              authorities.
            </p>
          </div>

          {/* Feature 1 */}

          <div className="feature-row">
            <div className="feature-content">
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
            </div>

            <div className="feature-image">
              <img src={report} alt="Report issue" />
            </div>
          </div>

          {/* Feature 2 */}

          <div className="feature-row reverse">
            <div className="feature-image">
              <img src={track} alt="Tracking" />
            </div>

            <div className="feature-content">
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

                <li>✔ Community notifications</li>
              </ul>
            </div>
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
            <div className="workflow-card">
              <div className="workflow-number">01</div>

              <h3>Submit a Report</h3>

              <p>
                Report a civic issue by adding a description, uploading
                supporting images, and marking its exact location on the map.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-number green">02</div>

              <h3>Officer Assignment</h3>

              <p>
                Administrators review incoming reports and assign them to the
                appropriate officer for investigation and action.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-number">03</div>

              <h3>Progress Tracking</h3>

              <p>
                Follow the report as officers provide updates and move the issue
                through its resolution stages in real time.
              </p>
            </div>

            <div className="workflow-card">
              <div className="workflow-number green">04</div>

              <h3>Issue Resolved</h3>

              <p>
                Once the issue has been resolved, citizens receive confirmation
                and can view the completed report in the system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DASHBOARD PREVIEW ================= */}

      <section className="dashboard-preview">
        <div className="landing-container dashboard-grid">
          <div className="dashboard-content">
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
                <h4>Interactive Heatmap</h4>

                <p>
                  Visualize issue hotspots on an interactive map to identify
                  areas that require immediate attention.
                </p>
              </div>

              <div>
                <h4>Officer Performance</h4>

                <p>
                  Evaluate officer assignments, completed reports, and response
                  times to improve operational efficiency.
                </p>
              </div>
            </div>
          </div>

          <div className="dashboard-image">
            <img src={analytics} alt="Dashboard Preview" />
          </div>
        </div>
      </section>
      {/* ================= CALL TO ACTION ================= */}

      <section className="cta-section">
        <div className="landing-container">
          <div className="cta-card">
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
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

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

export default Landing;
