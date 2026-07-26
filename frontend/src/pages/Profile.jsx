import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MyReports from "./MyReports";
import "../styles/adithya_css/adithya.css";
import toast from "react-hot-toast";
import userService from "../services/userService";
import { FiEdit2, FiLogOut, FiSave, FiX, FiMail } from "react-icons/fi";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await userService.updateProfile(editData);
      toast.success("Profile updated!");
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="dashboard-layout">
      <main className="dashboard-content">
        <div className="profile-page-wrapper">
          <div className="page-header">
            <h1>Profile</h1>
            <p>Manage your account and track your activity.</p>
          </div>

          <div className="profile-static-sidebar">
            <div className="identity-card">
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              {isEditing ? (
                <input
                  className="form-input identity-name-input"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              ) : (
                <h2>{user?.name}</h2>
              )}

              <span className="role-badge">{user?.role}</span>

              <div className="identity-info-list">
                <div className="identity-info-row">
                  <FiMail className="identity-info-icon" />
                  {isEditing ? (
                    <input
                      className="form-input"
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{user?.email}</span>
                  )}
                </div>
              </div>

              <div className="profile-actions">
                {isEditing ? (
                  <>
                    <button className="primary-btn" onClick={handleSave}>
                      <FiSave /> Save
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={() => setIsEditing(false)}
                    >
                      <FiX /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="secondary-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      <FiEdit2 /> Edit Profile
                    </button>
                    <button className="danger-btn" onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="myreports-scroll-container">
            <MyReports />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;