import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import officerService from "../services/officerService";
import toast from "react-hot-toast";

import "../styles/aakanksha.css";

function OfficerProfile() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [profile, setProfile] = useState({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "officer",
        department: "",
        phone: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
    
            const res = await officerService.getProfile();
    
            setProfile({
                name: res.data.name || "",
                email: user?.email || "",          // backend doesn't return email
                role: res.data.role || "officer",
                department: res.data.location || "", // you're using location instead
                phone: res.data.phoneNumber || ""
            });
    
        } catch (error) {
            console.log("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await officerService.updateProfile({
                name: profile.name,
                location: profile.department,
                phoneNumber: profile.phone,
                email: profile.email
            });
            toast.success("Profile updated successfully");
            setIsEditing(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile");
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    if (loading) {
        return <div className="officer-loading">Loading Profile Space...</div>;
    }

    return (
        <div className="officer-dashboard-container">
            <h1 className="officer-dashboard-main-title">Officer Profile</h1>

            <div className="officer-profile-card">
                <div className="officer-profile-header">
                    <div className="officer-profile-avatar">
                        {profile.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="officer-profile-meta">
                        <h2>{profile.name}</h2>
                        <span className="officer-role-badge">{profile.role.toUpperCase()}</span>
                    </div>
                </div>

                {!isEditing ? (
                    <div className="officer-profile-details">
                        <div className="officer-profile-info-grid">
                            <div className="profile-info-item">
                                <label>Full Name</label>
                                <p>{profile.name}</p>
                            </div>

                            <div className="profile-info-item">
                                <label>Email Address</label>
                                <p>{profile.email}</p>
                            </div>

                            <div className="profile-info-item">
                                <label>Department</label>
                                <p>{profile.department}</p>
                            </div>

                            <div className="profile-info-item">
                                <label>Contact Number</label>
                                <p>{profile.phone}</p>
                            </div>
                        </div>

                        <div className="officer-profile-actions">
                            <button
                                className="officer-btn btn-primary"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                            <button
                                className="officer-btn btn-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="officer-profile-edit-form">
                        <div className="officer-profile-info-grid">
                            <div className="profile-info-item">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="profile-info-item">
                                <label>Email Address (Read Only)</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="input-disabled"
                                />
                            </div>

                            <div className="profile-info-item">
                                <label>Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={profile.department}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="profile-info-item">
                                <label>Contact Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="officer-profile-actions">
                            <button type="submit" className="officer-btn btn-primary">
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="officer-btn btn-secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default OfficerProfile;