import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Profile() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;