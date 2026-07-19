import { useState, useEffect } from "react";

import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";

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
