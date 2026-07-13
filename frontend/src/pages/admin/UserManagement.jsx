import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import toast from 'react-hot-toast';
import DetailsOverlay from "../../components/DetailsOverlay";
import "../../styles/atharva.css"

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [loading, setLoading] = useState(true);

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
            const res = await adminService.getUserById(id);
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
            <div className="flex justify-center items-center h-80">
                Loading...
            </div>
        );
    }

    return (
        <div className="user-management">
            <Sidebar />

            <div className="content">

                <h1 className="page-title">User Management</h1>

                <div className="management-container">

                    {/* Users Table */}

                    <div className="table-section">

                        <table className="users-table">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className={
                                            selectedUser?._id === user._id
                                                ? "selected-row"
                                                : ""
                                        }
                                    >
                                        <td>{user.name}</td>

                                        <td>{user.email}</td>

                                        <td>{user.role}</td>

                                        <td>
                                            <span className="status">
                                                {user.status}
                                            </span>
                                        </td>

                                        <td className="actions">

                                            <button
                                                onClick={() => handleView(user._id)}
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleToggleStatus(user._id)
                                                }
                                            >
                                                {user.status === "Active"
                                                    ? "Block"
                                                    : "Unblock"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Details Panel */}
                    {selectedUser && (
                        <DetailsOverlay
                            open={true}
                            title="User Details"
                            onClose={() => {
                                setSelectedUser(null);
                                setUserStats(null);
                            }}
                            actions={
                                <>
                                    <button
                                        onClick={() => handleToggleStatus(selectedUser._id)}
                                    >
                                        {selectedUser.status === "Active"
                                            ? "Block User"
                                            : "Unblock User"}
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedUser(null);
                                            setUserStats(null);
                                        }}
                                    >
                                        Close
                                    </button>
                                </>
                            }
                        >
                            <section className="overlay-section">
                                <h3>Profile</h3>

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
                                </div>
                            </section>

                            <hr className="overlay-divider" />

                            <section className="overlay-section">
                                <h3>Issue Statistics</h3>

                                <div className="detail-grid">
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
                                </div>
                            </section>

                            <hr className="overlay-divider" />

                            <section className="overlay-section">
                                <h3>Account Information</h3>

                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <label>Joined On</label>
                                        <span>
                                            {new Date(selectedUser.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="detail-item">
                                        <label>User ID</label>
                                        <span>{selectedUser._id}</span>
                                    </div>
                                </div>
                            </section>
                        </DetailsOverlay>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserManagement;