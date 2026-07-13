import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import Sidebar from "../../components/Sidebar";
import toast from 'react-hot-toast';

function OfficerManagement() {
    const [officers, setOfficers] = useState([]);
    const [selectedOfficer, setSelectedOfficer] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const fetchOfficers = async () => {
        try {
            setLoading(true);
            const res = await adminService.getAllOfficers();
            setOfficers(res.data.officers);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOfficers();
    }, []);

    const handleView = async (id) => {
        try {
            const res = await adminService.getOfficerById(id);
            setSelectedOfficer(res.data.officer);

            setFormData({
                name: res.data.officer.name,
                email: res.data.officer.email,
                password: "",
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreate = async () => {
        try {
            const res = await adminService.createOfficer(formData);
            console.log(res)
            setFormData({
                name: "",
                email: "",
                password: "",
            });
            toast.success(res.data.officer.name+" officer created successfulyy")
            fetchOfficers();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async () => {
        if (!selectedOfficer) return;

        try {
            await adminService.updateOfficer(
                selectedOfficer._id,
                formData
            );
            toast.success("updated successfully")
            fetchOfficers();
            handleView(selectedOfficer._id);
        } catch (err) {
            console.log(err);
            toast.error("error updating officer")
        }
    };

    const handleDelete = async () => {
        if (!selectedOfficer) return;
        const name = selectedOfficer.name
        console.log(name)
        if (!window.confirm("Delete this officer?")) return;

        try {
            const res = await adminService.deleteOfficer(selectedOfficer._id);

            toast.success("Officer "+name+" deleted successfully")
            setSelectedOfficer(null);

            setFormData({
                name: "",
                email: "",
                password: "",
            });
            fetchOfficers();
        } catch (err) {
            console.log(err);
            toast.error("failed to delete officer")
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-96">
                <Sidebar />
                Loading...
            </div>
        );

    return (
        <div className="p-6">

            <Sidebar />
            <h1 className="text-3xl font-bold mb-6">
                Officer Management
            </h1>

            <div className="grid grid-cols-3 gap-6">

                {/* Left */}

                <div className="col-span-2 bg-white rounded shadow overflow-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Role</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {officers.map((officer) => (

                                <tr
                                    key={officer._id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-3">
                                        {officer.name}
                                    </td>

                                    <td className="p-3">
                                        {officer.email}
                                    </td>

                                    <td className="p-3 capitalize">
                                        {officer.role}
                                    </td>

                                    <td className="p-3 text-center">

                                        <button
                                            onClick={() =>
                                                handleView(officer._id)
                                            }
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            View
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Right */}

                <div className="bg-white rounded shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">

                        {selectedOfficer
                            ? "Officer Details"
                            : "Create Officer"}

                    </h2>

                    <div className="space-y-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder={
                                selectedOfficer
                                    ? "Leave blank to keep same password"
                                    : "Password"
                            }
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />

                        {selectedOfficer && (

                            <div className="text-sm text-gray-600">

                                <p>
                                    <strong>Joined:</strong>{" "}
                                    {new Date(
                                        selectedOfficer.createdAt
                                    ).toLocaleDateString()}
                                </p>

                                <p className="break-all">
                                    <strong>ID:</strong>{" "}
                                    {selectedOfficer._id}
                                </p>

                            </div>

                        )}

                        <div className="flex gap-3">

                            {selectedOfficer ? (
                                <>
                                    <button
                                        onClick={handleUpdate}
                                        className="flex-1 bg-green-600 text-white py-2 rounded"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 bg-red-600 text-white py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleCreate}
                                    className="w-full bg-blue-600 text-white py-2 rounded"
                                >
                                    Create Officer
                                </button>
                            )}

                        </div>

                        {selectedOfficer && (
                            <button
                                onClick={() => {
                                    setSelectedOfficer(null);

                                    setFormData({
                                        name: "",
                                        email: "",
                                        password: "",
                                    });
                                }}
                                className="w-full border rounded py-2"
                            >
                                Add New Officer
                            </button>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OfficerManagement;