import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MyReports from "./MyReports";
import "../styles/adithya_css/adithya.css"
function Profile() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <main className="dashboard-content">
        <div className="page-header">
          <h1>Profile</h1>
          <p>
            Manage your account and track your activity.
          </p>
        </div>
        <div className="profile-card">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h2>{user?.name}</h2>
          <span className="role-badge">
            {user?.role}
          </span>
          <div className="profile-info">
            <div className="info-item">
              <h4>Email</h4>
              <p>{user?.email}</p>
            </div>
            <div className="info-item">
              <h4>Role</h4>
              <p>{user?.role}</p>
            </div>
          </div>
          <div className="profile-actions">
            <button
              className="primary-btn logout-profile-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="myreports-section">
          <MyReports />
        </div>
      </main>
    </div>
  );
}

export default Profile;