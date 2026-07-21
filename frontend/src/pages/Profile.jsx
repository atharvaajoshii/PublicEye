import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MyReports from "./MyReports";
import "../styles/adithya_css/adithya.css";
import toast from "react-hot-toast";
import userService from "../services/userService";
function Profile() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
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
        <div className="page-header">
          <h1>Profile</h1>
          <p>
            Manage your account and track your activity.
          </p>
        </div>
        <div className="profile">
        <div className="profile-card">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          {isEditing ? (<input
            className="form-input"
            name="name"
            value={editData.name}
            onChange={handleChange}
          />
          ) : (
            <h2>{user?.name}</h2>
          )}
          <span className="role-badge">
            {user?.role}
          </span>
          <div className="profile-info">
            <div className="info-item">
              <h4>Email</h4>
              {isEditing ? (<input
                className="form-input"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
              ) : (
                <p>{user?.email}</p>
              )}
            </div>
            <div className="info-item">
              <h4>Role</h4>
              <p>{user?.role}</p>
            </div>
          </div>
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button className="primary-btn" onClick={handleSave} >
                  Save Changes
                </button>

                <button className="secondary-btn" onClick={() => setIsEditing(false)} >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className="secondary-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
                <button className="primary-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
        <div className="myreports-section">
          <MyReports />
        </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;