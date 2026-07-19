import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import toast from 'react-hot-toast';
import DetailsOverlay from "../../components/DetailsOverlay";
import "../../styles/atharva.css"
import "../../styles/overlay.css"


function UserManagement() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedUser, setExpandedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await adminService.getAllUsers();
            setUsers(res.data.users);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

const handleView = async (id) => {
    try {
        if (expandedUser === id) {
            setExpandedUser(null);
            setSelectedUser(null);
            setUserStats(null);
            return;
        }

        const res = await adminService.getUserById(id);

        setExpandedUser(id);
        setSelectedUser(res.data.user);
        setUserStats(res.data.stats);

    } catch (err) {
        console.log(err);
    }
};

    const handleToggleStatus = async (id) => {
        try {
            const res = await adminService.toggleUserStatus(id);

            fetchUsers();

            if (selectedUser?._id === id) {
                const res = await adminService.getUserById(id);
                setSelectedUser(res.data.user);
            }
            toast.success(res.data.message)
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.error || "Failed to update user status");

        }
    };

    if (loading) {
        return (
            <div className="main loading">
                Loading...
            </div>
        );
    }

    return (
<div className="officer-dashboard-container">

    <h1 className="officer-dashboard-main-title">
        User Management
    </h1>

    <div className="issue-list">

        {users.map((user) => (

            <div
                key={user._id}
                className={`issue-card ${
                    expandedUser === user._id ? "expanded" : ""
                }`}
            >

                {/* Header */}

                <div
                    className="issue-header"
                    onClick={() => handleView(user._id)}
                >

                    <div className="issue-header-left">

                        <h3>{user.name}</h3>

                        <span className="issue-category">
                            {user.role}
                        </span>

                    </div>

                    <div className="issue-header-right">

                        <span
                            className={`officer-status-badge ${
                                user.status.toLowerCase()
                            }`}
                        >
                            {user.status}
                        </span>

                        <span className="expand-icon">
                            {expandedUser === user._id ? "−" : "+"}
                        </span>

                    </div>

                </div>

                {/* Details */}

                <div
                    className={`issue-details ${
                        expandedUser === user._id ? "open" : ""
                    }`}
                >

                    {selectedUser?._id === user._id && (

                        <>
                            <div className="detail-grid">

                                <div className="detail-item">
                                    <label>Name</label>
                                    <span>{selectedUser.name}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Email</label>
                                    <span>{selectedUser.email}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Role</label>
                                    <span>{selectedUser.role}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Status</label>
                                    <span>{selectedUser.status}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Total Issues</label>
                                    <span>{userStats?.totalIssues}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Pending</label>
                                    <span>{userStats?.pendingIssues}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Assigned</label>
                                    <span>{userStats?.assignedIssues}</span>
                                </div>

                                <div className="detail-item">
                                    <label>In Progress</label>
                                    <span>{userStats?.inProgressIssues}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Resolved</label>
                                    <span>{userStats?.resolvedIssues}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Rejected</label>
                                    <span>{userStats?.rejectedIssues}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Joined</label>
                                    <span>
                                        {new Date(
                                            selectedUser.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="detail-item">
                                    <label>User ID</label>
                                    <span>{selectedUser._id}</span>
                                </div>

                            </div>

                            <div className="issue-actions">

                                <button
                                    className={`officer-btn ${
                                        selectedUser.status === "Active"
                                            ? "btn-danger"
                                            : "btn-primary"
                                    }`}
                                    onClick={() =>
                                        handleToggleStatus(
                                            selectedUser._id
                                        )
                                    }
                                >
                                    {selectedUser.status === "Active"
                                        ? "Block User"
                                        : "Unblock User"}
                                </button>

                            </div>

                        </>

                    )}

                </div>

            </div>

        ))}

    </div>

</div>
    );
}

export default UserManagement;