// pages/OfficerProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import userService from "../services/userService";
import officerService from "../services/officerService";
import toast from "react-hot-toast";

import "../styles/aakanksha.css";
import "../styles/adithya_css/adithya.css";
import {
  FiEdit2, FiLogOut, FiSave, FiX, FiMail, FiMapPin, FiPhone,
  FiShield, FiGrid, FiFileText, FiMap, FiBarChart2, FiLock, FiUsers,
} from "react-icons/fi";

const QUICK_LINKS = {
  admin: [
    { label: "Manage Officers", path: "/admin/manage-officers", icon: <FiUsers /> },
    { label: "Manage Users", path: "/admin/manage-users", icon: <FiUsers /> },
    { label: "Manage Issues", path: "/admin/manage-issues", icon: <FiFileText /> },
    { label: "Reports", path: "/admin/reports", icon: <FiBarChart2 /> },
  ],
  officer: [
    { label: "Manage Issues", path: "/officer/manage-issues", icon: <FiFileText /> },
    { label: "Issue Map", path: "/issues/map", icon: <FiMap /> },
    { label: "Analytics", path: "/analytics", icon: <FiBarChart2 /> },
  ],
};

const EMPTY_PROFILE = { name: "", email: "", role: "", department: "", phone: "" };

function OfficerProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [editValues, setEditValues] = useState({ name: "", phone: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isOfficer = user?.role === "officer";

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await userService.getProfile();

      let department = "";
      if (isOfficer) {
        try {
          const officerRes = await officerService.getProfile();
          department = officerRes?.data?.officer?.department || "";
        } catch {
          // nice-to-have; ignore failure
        }
      }

      setProfile({
        name: res?.name || user?.name || "",
        email: res?.email || user?.email || "",
        role: res?.role || user?.role || "",
        phone: res?.phone || "",
        department,
      });
    } catch (error) {
      console.log("Error fetching profile:", error);
      toast.error("Failed to load profile");
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "",
        department: "",
        phone: "",
      });
    } finally {
      setLoading(false);
    }
  };

  // Pure state change. No network call. No form. Nothing to accidentally submit.
  const enterEditMode = () => {
    console.log("enterEditMode fired"); // TEMP: remove once confirmed working
    setEditValues({ name: profile.name, phone: profile.phone });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  // No longer takes an event, no longer a form submit handler —
  // called directly from the Save button's onClick.
  const handleSave = async () => {
    console.log("handleSave fired", editValues); // TEMP: remove once confirmed working
    try {
      setSaving(true);
      const res = await userService.updateProfile({
        name: editValues.name,
        phone: editValues.phone,
      });
      const updated = res?.user;
      setProfile((prev) => ({
        ...prev,
        name: updated?.name ?? editValues.name,
        phone: updated?.phone ?? editValues.phone,
      }));
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValues({ name: profile.name, phone: profile.phone });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <div className="officer-loading">Loading Profile Space...</div>;
  }

  const quickLinks = QUICK_LINKS[profile.role] || [];

  return (
    <div className="dashboard-layout">
      <main className="dashboard-content">
        <div className="profile-page-wrapper">
          <div className="page-header">
            <h1>{isOfficer ? "Officer Profile" : "Admin Profile"}</h1>
            <p>Manage your account details{isOfficer ? " and duty information." : "."}</p>
          </div>

          <div className="profile-static-sidebar">
            {/* Plain div now — NOT a <form>. Nothing can "submit" by accident. */}
            <div className="identity-card">
              <div className="profile-avatar">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
              </div>

              {isEditing ? (
                <input
                  className="form-input identity-name-input"
                  name="name"
                  value={editValues.name}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              ) : (
                <h2>{profile.name || "Unnamed"}</h2>
              )}

              <span className="role-badge">{profile.role}</span>

              <div className="identity-info-list">
                <div className="identity-info-row is-locked">
                  <FiMail className="identity-info-icon" />
                  <span>{profile.email || "Not set"}</span>
                  <FiLock className="lock-icon" title="Managed by admin" />
                </div>

                {isOfficer && (
                  <div className="identity-info-row is-locked">
                    <FiMapPin className="identity-info-icon" />
                    <span>{profile.department || "Not set"}</span>
                    <FiLock className="lock-icon" title="Managed by admin" />
                  </div>
                )}

                <div className="identity-info-row">
                  <FiPhone className="identity-info-icon" />
                  {isEditing ? (
                    <input
                      className="form-input"
                      name="phone"
                      value={editValues.phone}
                      onChange={handleChange}
                      placeholder="Contact number"
                    />
                  ) : (
                    <span>{profile.phone || "Not set"}</span>
                  )}
                </div>
              </div>

              {isEditing && (
                <p className="edit-hint">
                  Email{isOfficer ? " and department are" : " is"} managed by your administrator.
                </p>
              )}

              <div className="profile-actions">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : (<><FiSave /> Save</>)}
                    </button>
                    <button type="button" className="secondary-btn" onClick={handleCancel}>
                      <FiX /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className="secondary-btn" onClick={enterEditMode}>
                      <FiEdit2 /> Edit Profile
                    </button>
                    <button type="button" className="danger-btn" onClick={handleLogout}>
                      <FiLogOut /> Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="myreports-scroll-container">
            <div className="context-panel">
              <div className="context-card">
                <div className="context-card-head">
                  <FiShield /> <h3>Account Overview</h3>
                </div>
                <div className="context-grid">
                  <div className="context-item">
                    <label>Role</label>
                    <p>{profile.role}</p>
                  </div>
                  {isOfficer && (
                    <div className="context-item">
                      <label>Department</label>
                      <p>{profile.department || "Not set"}</p>
                    </div>
                  )}
                  <div className="context-item">
                    <label>Contact</label>
                    <p>{profile.phone || "Not set"}</p>
                  </div>
                  {!isOfficer && (
                    <div className="context-item">
                      <label>Access Level</label>
                      <p>Full system access</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="context-card">
                <div className="context-card-head">
                  <FiGrid /> <h3>Quick Management</h3>
                </div>
                <div className="quick-links-grid">
                  {quickLinks.map((link) => (
                    <button
                      key={link.path}
                      className="quick-link-tile"
                      onClick={() => navigate(link.path)}
                    >
                      <span className="quick-link-icon">{link.icon}</span>
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OfficerProfile;