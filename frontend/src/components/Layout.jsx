import { HiOutlineMenuAlt3 } from "react-icons/hi";

import { useState } from "react";

import Sidebar from "./Sidebar"

import { Outlet } from 'react-router-dom'

function Layout() {
    const isMobile = window.innerWidth < 768;

    const [isSidebarOpen, setIsSidebarOpen] =
        useState(!isMobile);
    return (
        <>
            <button
                className="menu-btn"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <HiOutlineMenuAlt3 size={26} />
            </button>

            {isMobile && isSidebarOpen && (
                <div
                    className="overlay"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar
                isOpen={isSidebarOpen}
                closeSidebar={() => setIsSidebarOpen(false)}
            />

            <main
                className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"
                    }`}
            >
                <Outlet />
            </main>
        </>
    );
}

export default Layout;