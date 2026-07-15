import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import toast from 'react-hot-toast';
import DetailsOverlay from "../../components/DetailsOverlay";

function OfficerManagement() {
    const [officers, setOfficers] = useState([]);
    const [selectedOfficer, setSelectedOfficer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreateOverlay, setShowCreateOverlay] = useState(false);

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
    }
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
            toast.success(res.data.officer.name + " officer created successfulyy")
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

            toast.success("Officer " + name + " deleted successfully")
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
            <div className="main loading">
                Loading...
            </div>
        );
    return (
        <div className="main user-management">
            {/* <Sidebar /> */}
            <div className="content">
                <div className="page-header">
                    <h1 className="page-title">Officer Management</h1>
                    <button onClick={() => { 
                            setFormData({
                                name: "",
                                email: "",
                                password: "",
                            });
                            setShowCreateOverlay(true);
                        }}> + Create Officer </button>
                </div>
                <div className="table-section">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {officers.map((officer) => (
                                <tr key={officer._id} className={ selectedOfficer?._id === officer._id ? "selected-row" : "" } >
                                    <td>{officer.name}</td>
                                    <td>{officer.email}</td>
                                    <td>{officer.role}</td>
                                    <td className="actions">
                                        <button onClick={() => handleView(officer._id) }>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showCreateOverlay && (
                    <DetailsOverlay open={true} title="Create Officer"  onClose={() => {
                            setShowCreateOverlay(false);
                            setFormData({
                                name: "",
                                email: "",
                                password: "",
                            });
                        }}
                        actions={
                            <>
                                <button onClick={async () => {
                                        await handleCreate();
                                        setShowCreateOverlay(false);
                                    }}>Create Officer </button>
                                <button onClick={() => {setShowCreateOverlay(false);  setFormData({ name: "", email: "",  password: "", }); }} > Cancel 
                                </button>
                            </>
                        }
                    >
                        <section className="overlay-section">
                            <h3>Officer Information</h3>

                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="detail-item">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="detail-item">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </section>
                    </DetailsOverlay>
                )}

                {/* VIEW / UPDATE OFFICER */}
                {selectedOfficer && (
                    <DetailsOverlay
                        open={true}
                        title="Officer Details"
                        onClose={() => {
                            setSelectedOfficer(null);
                            setFormData({
                                name: "",
                                email: "",
                                password: "",
                            });
                        }}
                        actions={
                            <>
                                <button onClick={handleUpdate}>
                                    Update
                                </button>

                                <button onClick={handleDelete}>
                                    Delete
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedOfficer(null);
                                        setFormData({
                                            name: "",
                                            email: "",
                                            password: "",
                                        });
                                    }}
                                >
                                    Close
                                </button>
                            </>
                        }
                    >
                        <section className="overlay-section">
                            <h3>Officer Information</h3>

                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="detail-item">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="detail-item">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Leave blank to keep current password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </section>

                        <hr className="overlay-divider" />

                        <section className="overlay-section">
                            <h3>Account Information</h3>

                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Joined</label>
                                    <span>
                                        {new Date(
                                            selectedOfficer.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="detail-item">
                                    <label>Officer ID</label>
                                    <span>{selectedOfficer._id}</span>
                                </div>
                            </div>
                        </section>
                    </DetailsOverlay>
                )}

            </div>
        </div>
    );
}

export default OfficerManagement;