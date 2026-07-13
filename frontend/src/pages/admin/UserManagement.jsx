import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import toast from 'react-hot-toast';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
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
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                User Management
            </h1>

            <div className="grid grid-cols-3 gap-6">

                {/* Users Table */}

                <div className="col-span-2 bg-white rounded-lg shadow overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-5 py-3 text-left">Name</th>
                                <th className="px-5 py-3 text-left">Email</th>
                                <th className="px-5 py-3 text-left">Role</th>
                                <th className="px-5 py-3 text-left">Status</th>
                                <th className="px-5 py-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4">{user.name}</td>

                                    <td className="px-5 py-4">{user.email}</td>

                                    <td className="px-5 py-4 capitalize">
                                        {user.role}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${user.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 flex gap-2 justify-center">

                                        <button
                                            onClick={() => handleView(user._id)}
                                            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleToggleStatus(user._id)
                                            }
                                            className={`px-3 py-1 rounded text-white ${user.status === "Active"
                                                ? "bg-red-500 hover:bg-red-600"
                                                : "bg-green-500 hover:bg-green-600"
                                                }`}
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

                {/* User Details */}

                <div className="bg-white rounded-lg shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        User Details
                    </h2>

                    {selectedUser ? (
                        <div className="space-y-4">

                            <div>
                                <p className="text-gray-500">Name</p>
                                <p className="font-medium">
                                    {selectedUser.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Email</p>
                                <p>{selectedUser.email}</p>
                            </div>

                            <div>
                                <p className="text-gray-500">Role</p>
                                <p className="capitalize">
                                    {selectedUser.role}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">Status</p>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${selectedUser.status === "Active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {selectedUser.status}
                                </span>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Joined On
                                </p>

                                <p>
                                    {new Date(
                                        selectedUser.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">User ID</p>

                                <p className="break-all text-sm">
                                    {selectedUser._id}
                                </p>
                            </div>

                        </div>
                    ) : (
                        <div className="text-gray-500">
                            Select a user to view details.
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}

export default UserManagement;