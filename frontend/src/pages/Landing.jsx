import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
  animate,
} from "framer-motion";
import {
  FiArrowRight,
  FiLogIn,
  FiSearch,
  FiFileText,
  FiCheckCircle,
  FiUsers,
  FiMapPin,
  FiBell,
  FiShield,
  FiBarChart2,
  FiCamera,
} from "react-icons/fi";

import logo from "../assets/logo.png";
import footer_logo from "../assets/logo_name_tagline.png";
// NOTE: swap these two paths for your real asset filenames —
// I don't have access to your assets folder, so these are the
// two names I assumed. Everything else in this file expects a
// plain <img>, so renaming the import is the only change needed.
import heroImage from "../assets/hero.png";
import analyticsImage from "../assets/analytics.png";

import { useLenis } from "./useLenis";

// npm i lenis gsap  (see useLenis.js for the wiring notes)

/* =========================================================
   Shared helpers
========================================================= */

const EASE_OUT = [0.16, 1, 0.3, 1];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 992px)",
    );
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function Reveal({
  as: Tag = "div",
  className,
  children,
  y = 42,
  delay = 0,
  duration = 0.8,
  ...rest
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* =========================================================
   SECTION HANDOFF — used on sections that don't already run
   their own sticky/scroll choreography (Why, Analytics).
   As the section approaches the viewport it fades+rises in;
   as it approaches leaving, it fades+settles down — so the
   next section is already revealing itself underneath while
   this one is still easing out, instead of a hard cut.
========================================================= */

function SectionReveal({
  as: Tag = "section",
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[Tag] || motion.section;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [64, 0, 0, -64]);

  return (
    <MotionTag
      ref={ref}
      className={`section-reveal ${className}`}
      style={prefersReducedMotion ? undefined : { opacity, y }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* =========================================================
   CURSOR-REACTIVE AMBIENT LIGHT FIELD (desktop only)
========================================================= */

function CursorGlow() {
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x1 = useSpring(rawX, { stiffness: 110, damping: 22, mass: 0.5 });
  const y1 = useSpring(rawY, { stiffness: 110, damping: 22, mass: 0.5 });
  const x2 = useSpring(rawX, { stiffness: 60, damping: 24, mass: 0.9 });
  const y2 = useSpring(rawY, { stiffness: 60, damping: 24, mass: 0.9 });
  const x3 = useSpring(rawX, { stiffness: 34, damping: 26, mass: 1.3 });
  const y3 = useSpring(rawY, { stiffness: 34, damping: 26, mass: 1.3 });

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;
    const handleMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    rawX.set(window.innerWidth * 0.5);
    rawY.set(window.innerHeight * 0.4);
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isDesktop, prefersReducedMotion, rawX, rawY]);

  if (!isDesktop || prefersReducedMotion) return null;

  return (
    <div className="cursor-glow" aria-hidden="true">
      <div className="cursor-glow__drift cursor-glow__drift--a">
        <motion.div
          className="cursor-glow__blob cursor-glow__blob--a"
          style={{ x: x1, y: y1 }}
        />
      </div>
      <div className="cursor-glow__drift cursor-glow__drift--b">
        <motion.div
          className="cursor-glow__blob cursor-glow__blob--b"
          style={{ x: x2, y: y2 }}
        />
      </div>
      <div className="cursor-glow__drift cursor-glow__drift--c">
        <motion.div
          className="cursor-glow__blob cursor-glow__blob--c"
          style={{ x: x3, y: y3 }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

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

/* =========================================================
   HERO
   Rebuilt: one centered grid (text left / image right,
   balanced gutters), a CSS-keyframe "assembling toward the
   center" entrance (each piece from its own direction, no
   plain fades), and the ORIGINAL hero image restored — no
   abstract object, just a subtle idle float + mouse parallax.
========================================================= */

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
        <div className="hero-content">
          <span
            className={`hero-tag${animClass("from-left")}`}
            style={{ animationDelay: `${delays.tag}s` }}
          >
            Community Powered Civic Reporting
          </span>

          <h1
            className={`hero-heading${animClass("from-left")}`}
            style={{ animationDelay: `${delays.heading}s` }}
          >
            See it. Report it. <span>Improve your city.</span>
          </h1>

          <p
            className={`hero-copy${animClass("from-right")}`}
            style={{ animationDelay: `${delays.copy}s` }}
          >
            PublicEye empowers citizens to report civic issues, track their
            progress, and work together with local authorities to build cleaner,
            safer communities.
          </p>

          <div
            className={`hero-buttons${animClass("from-bottom")}`}
            style={{ animationDelay: `${delays.buttons}s` }}
          >
            <Link to="/register" className="primary-btn">
              <FiFileText />
              Report an Issue
            </Link>
            <Link to="/all-issues" className="secondary-btn">
              <FiSearch />
              Explore Reports
            </Link>
          </div>
        </div>

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

/* =========================================================
   WHY PUBLICEYE — denser, filled value grid
========================================================= */

const WHY_ITEMS = [
  {
    icon: <FiFileText />,
    title: "Report in under a minute",
    body: "Add a photo, drop a pin on the map, pick a category, and submit. No forms to hunt through.",
  },
  {
    icon: <FiBell />,
    title: "Stay in the loop",
    body: "Get notified the moment an officer is assigned or your report changes status — no need to check back.",
  },
  {
    icon: <FiUsers />,
    title: "Community-verified",
    body: "Neighbors can confirm or upvote reports, helping authorities prioritize what matters most first.",
  },
  {
    icon: <FiShield />,
    title: "Built for accountability",
    body: "Every report keeps a visible timeline from submission to resolution, open for anyone to see.",
  },
];

function WhyPublicEye() {
  return (
    <SectionReveal className="why-section landing-section" id="features-intro">
      <div className="landing-container">
        <Reveal as="div" className="section-heading" y={30}>
          <span>Why PublicEye?</span>
          <h2>
            Everything you need to keep your community informed and connected.
          </h2>
          <p>
            PublicEye creates a transparent bridge between citizens and local
            authorities — from the first report to the final fix.
          </p>
        </Reveal>

        <div className="why-grid">
          {WHY_ITEMS.map((item, i) => (
            <Reveal
              as="div"
              className="why-card"
              y={40}
              delay={i * 0.09}
              key={item.title}
              whileHover={{
                y: -8,
                transition: { duration: 0.35, ease: EASE_OUT },
              }}
            >
              <div className="why-card-glow" aria-hidden="true" />
              <motion.div
                className="why-card-icon"
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                {item.icon}
              </motion.div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

/* =========================================================
   HOW IT WORKS — sticky rotating object + ONE active step.
   The step number now lives on the object itself (a single
   floating badge), instead of duplicating it in the list —
   so the visual and the copy read as one composition.
========================================================= */

const STEPS = [
  {
    title: "Submit a Report",
    body: "Report a civic issue by adding a description, uploading supporting images, and marking its exact location on the map.",
  },
  {
    title: "Officer Assignment",
    body: "Administrators review incoming reports and assign them to the appropriate officer for investigation and action.",
  },
  {
    title: "Progress Tracking",
    body: "Follow the report as officers provide updates and move the issue through its resolution stages in real time.",
  },
  {
    title: "Issue Resolved",
    body: "Officers mark the issue as resolved, and the report is updated with its final status for public transparency.",
  },
];

function HowItWorks() {
  const trackRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.92, 1, 1, 0.95],
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      STEPS.length - 1,
      Math.max(0, Math.floor(v * STEPS.length)),
    );
    setActive(idx);
  });

  return (
    <section className="workflow-section landing-section" id="how">
      <div className="landing-container">
        <Reveal as="div" className="section-heading" y={30}>
          <span>How it Works</span>
          <h2>Four simple steps to improve your neighborhood.</h2>
        </Reveal>
      </div>

      <div className="workflow-sticky-track" ref={trackRef}>
        <div className="workflow-sticky">
          <div className="landing-container workflow-grid">
            <div className="workflow-visual">
              <div className="workflow-visual-ring" />
              <div className="workflow-visual-ring r2" />
              <motion.div
                className="workflow-visual-object"
                style={{
                  rotate: prefersReducedMotion ? 0 : rotate,
                  scale: prefersReducedMotion ? 1 : scale,
                }}
              />
            </div>

            <div className="workflow-steps-list">
              {STEPS.map((step, i) => {
                const isActive = i === active;
                const isPast = i < active;
                return (
                  <motion.div
                    key={step.title}
                    className={`workflow-step${isActive ? " is-active" : ""}`}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : isPast ? -30 : 30,
                    }}
                    initial={false}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                  >
                    <span className="workflow-number">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FEATURES — a vertical Ferris wheel.
   The wheel never stops rotating (a slow, constant ambient
   spin). Scroll adds extra rotation on top of that and
   decides which card is at the front. Depth (scale, opacity,
   blur, stacking) is computed per-card from how close it is
   to the front position — so the far side of the wheel
   genuinely recedes instead of sitting flat on a ring.
========================================================= */

const FEATURE_GROUPS = [
  {
    heading: "Citizen Experience",
    features: [
      {
        icon: <FiFileText />,
        title: "Smart Reporting",
        body: "Submit civic issues with photos, location and detailed descriptions in seconds.",
      },
      {
        icon: <FiCamera />,
        title: "Photo Evidence",
        body: "Attach images to help authorities understand the issue immediately.",
      },
      {
        icon: <FiBell />,
        title: "Instant Notifications",
        body: "Receive updates every time your complaint progresses.",
      },
      {
        icon: <FiCheckCircle />,
        title: "Live Tracking",
        body: "Track complaints from submission until resolution.",
      },
    ],
  },

  {
    heading: "Administration",
    features: [
      {
        icon: <FiUsers />,
        title: "Officer Assignment",
        body: "Automatically assign reports to the responsible department.",
      },
      {
        icon: <FiMapPin />,
        title: "Location Intelligence",
        body: "Identify hotspots using interactive GIS visualization.",
      },
      {
        icon: <FiBarChart2 />,
        title: "Analytics",
        body: "Monitor department performance and response time.",
      },
      {
        icon: <FiShield />,
        title: "Secure Management",
        body: "Role-based access keeps every action protected.",
      },
    ],
  },
];

const FEATURES = FEATURE_GROUPS.flatMap((g) => g.features);

const CARD_COUNT = FEATURES.length;

const STEP_ANGLE = 360 / CARD_COUNT;

const ACTIVE_ANGLE = 0;

function normalize(angle) {
  return ((angle % 360) + 360) % 360;
}

function shortestDistance(a, b) {
  let diff = normalize(a - b);

  if (diff > 180) diff = 360 - diff;

  return diff;
}

function FeatureWheel() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // One complete wheel rotation across the whole section.
  // Later we'll slow this further if needed.
  const rotation = useTransform(scrollYProgress, [0, 1], [0, -360]);

  const [heading, setHeading] = useState(FEATURE_GROUPS[0].heading);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(rotation, "change", (angle) => {
    const index = Math.round(normalize(-angle) / STEP_ANGLE) % CARD_COUNT;

    setActiveIndex(index);

    setHeading(
      index < 4 ? FEATURE_GROUPS[0].heading : FEATURE_GROUPS[1].heading,
    );
  });

  return (
    <section className="feature-wheel" ref={sectionRef}>
      <div className="feature-track">
        <div className="feature-sticky">
          <div className="wheel-heading">
            <AnimatePresence mode="wait">
              <motion.div
                key={heading}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.45,
                }}
              >
                <span className="section-tag">FEATURES</span>

                <h2 className="section-title">{heading}</h2>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="wheel-stage">
            {FEATURES.map((feature, index) => (
              <WheelCard
                key={feature.title}
                feature={feature}
                index={index}
                rotation={rotation}
                active={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WheelCard({ feature, index, rotation, active }) {
  const style = useTransform(rotation, (rot) => {
    const angle = normalize(rot + index * STEP_ANGLE);

    const rad = (angle * Math.PI) / 180;

    const radiusX = 250;
    const radiusY = 200;

    const dist = shortestDistance(angle, ACTIVE_ANGLE);

    const depth = (Math.cos((dist * Math.PI) / 180) + 1) / 2;

    const active = depth > 0.985;

    const easedDepth = Math.pow(depth, 1.8);

    const pop = easedDepth * 450;

    return {
      x: Math.cos(rad) * radiusX + pop,

      y: Math.sin(rad) * radiusY,

      scale: 0.72 + easedDepth * 0.68,

      opacity: 0.35 + easedDepth * 0.65,

      blur: (1 - easedDepth) * 6,

      rotateY: (0.5 - easedDepth) * 24,

      rotateX: Math.sin(rad) * 5,

      z: 100 + Math.round(easedDepth * 900),

      easedDepth,

      expanded: easedDepth > 0.94,
    };
  });

  const x = useTransform(style, (s) => s.x);

  const y = useTransform(style, (s) => s.y);

  const scale = useTransform(style, (s) => s.scale);

  const opacity = useTransform(style, (s) => s.opacity);

  const zIndex = useTransform(style, (s) => s.z);

  const rotateY = useTransform(style, (s) => s.rotateY);

  const rotateX = useTransform(style, (s) => s.rotateX);

  const blur = useTransform(style, (s) => s.blur);

  const filter = useTransform(style, (s) =>
    s.easedDepth > 0.985 ? "blur(0px)" : `blur(${s.blur}px)`,
  );

  const shadow = useTransform(
    style,
    (s) =>
      `0 ${10 + s.easedDepth * 30}px ${25 + s.easedDepth * 45}px rgba(93,63,211,${0.08 + s.easedDepth * 0.14})`,
  );

  return (
    <motion.div
      className="wheel-card"
      style={{
        x,

        y,

        scale,

        opacity,

        rotateY,

        rotateX,

        zIndex,

        filter,

        boxShadow: shadow,
      }}
    >
      <div className="wheel-card-icon">{feature.icon}</div>

      <h3>{feature.title}</h3>

      <motion.div
        initial={false}
        animate={{
          height: active ? "auto" : 0,
          opacity: active ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        style={{
          overflow: "hidden",
        }}
      >
        <p>{feature.body}</p>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   ANALYTICS — real product asset, glass frame, float + reveal
========================================================= */

function AnalyticsPreview() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="analytics-frame">
      <div className={prefersReducedMotion ? "" : "analytics-float"}>
        <img src={analyticsImage} alt="PublicEye analytics dashboard" />
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <SectionReveal className="dashboard-preview landing-section">
      <div className="landing-container dashboard-grid">
        <Reveal as="div" className="dashboard-content" y={40}>
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
                engagement through interactive charts.
              </p>
            </div>
            <div>
              <h4>Resolution Tracking</h4>
              <p>
                Monitor every issue from submission to completion with real-time
                status updates.
              </p>
            </div>
            <div>
              <h4>Status-Based Workflow</h4>
              <p>
                Every report progresses through clearly defined stages, easy to
                monitor at a glance.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal y={60} delay={0.1}>
          <AnalyticsPreview />
        </Reveal>
      </div>
    </SectionReveal>
  );
}

/* =========================================================
   CTA — card deck that stacks upward as you scroll, then the
   final glowing glass panel stays, floating above the footer.
========================================================= */

const DECK_CARDS = [
  {
    tag: "01",
    title: "Report what you see",
    body: "One photo and a pin on the map is all it takes to start a report.",
  },
  {
    tag: "02",
    title: "Watch it move",
    body: "Track assignment and progress as your report works its way to resolution.",
  },
  {
    tag: "03",
    title: "See it resolved",
    body: "Get a clear, public record the moment the issue is actually fixed.",
  },
];

function DeckCard({ card, index, active }) {
  const isActive = index === active;

  return (
    <motion.div
      className="deck-card"
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 40,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      style={{
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <span className="deck-card-tag">{card.tag}</span>

      <h3>{card.title}</h3>

      <p>{card.body}</p>
    </motion.div>
  );
}

function CallToAction() {
  const deckRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const step = 1 / DECK_CARDS.length;

    const index = Math.min(DECK_CARDS.length - 1, Math.floor(v / step));

    if (index !== active) {
      setActive(index);
    }
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  return (
    <section className="cta-section landing-section">
      <div className="cta-header">
        <section className="cta-header">
          <span className="section-chip">How it works</span>

          <h2>Three simple steps.</h2>

          <p>
            Reporting an issue takes less than a minute, and every update stays
            visible until it's resolved.
          </p>
        </section>
      </div>

      <div className="landing-container">
        <div className="cta-deck">
          {DECK_CARDS.map((card, index) => (
            <motion.div
              key={card.tag}
              className="deck-card"
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <span className="deck-card-tag">{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="landing-container">
        <motion.div
          className="cta-card"
          initial={{
            opacity: 0,
            y: 120,
            scale: 0.92,
            rotateX: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
          }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -8,
            rotateX: 3,
            rotateY: -3,
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();

            x.set((e.clientX - rect.left) / rect.width - 0.5);

            y.set((e.clientY - rect.top) / rect.height - 0.5);
          }}
          style={{
            rotateX,

            rotateY,

            perspective: 1400,
          }}
        >
          <div className="cta-glow" aria-hidden="true" />
          <div className="cta-content">
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Join the movement
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              Help build a cleaner, smarter and safer city.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Every report contributes to a more transparent, responsive, and
              connected community. Start making an impact today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="cta-buttons"
            >
              <Link to="/register" className="primary-btn">
                Create an Account
                <FiArrowRight />
              </Link>
              <Link to="/login" className="secondary-btn">
                Login
              </Link>
            </motion.div>
          </div>

          <div className="cta-pattern">
            <div className="circle purple"></div>
            <div className="circle green"></div>
            <div className="circle light"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

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

/* =========================================================
   PAGE
========================================================= */

function Landing() {
  useLenis();

  return (
    <div className="landing">
      <CursorGlow />
      <div className="landing-static-blob blob-one" aria-hidden="true" />
      <div className="landing-static-blob blob-two" aria-hidden="true" />

      <Navbar />
      <Hero />
      <WhyPublicEye />
      <HowItWorks />
      <FeatureWheel />
      <DashboardPreview />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default Landing;
