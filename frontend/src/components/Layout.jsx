import { useState, useEffect } from "react";

import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
function Layout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  return (
    <>
    {isMobile && (
    <button
        className={`mobile-menu-btn ${
            isSidebarOpen ? "open" : ""
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
        {isSidebarOpen ? <FiX /> : <FiMenu />}
    </button>
)}
      {isMobile && !isSidebarOpen && (
        <button
          className="mobile-menu-btn"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FiMenu />
        </button>
      )}

      {isMobile && isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <main
        className={`main-content ${
          isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"
        }`}
      >
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
