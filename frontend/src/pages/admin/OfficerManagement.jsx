import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import toast from 'react-hot-toast';

function OfficerManagement() {
    const [officers, setOfficers] = useState([]);
    const [selectedOfficer, setSelectedOfficer] = useState(null);
    const [expandedOfficer, setExpandedOfficer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [showCreateOverlay, setShowCreateOverlay] = useState(false);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const fetchOfficers = async () => {
        try {
            setLoading(true);
            const res = await adminService.getAllOfficers({ search: debouncedSearch, sort, });
            setOfficers(res.data.officers);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchOfficers();
    }, [debouncedSearch, sort]);

    const handleView = async (id) => {
        try {
            if (expandedOfficer === id) {
                setExpandedOfficer(null);
                setSelectedOfficer(null);
                return;
            }

            const res = await adminService.getOfficerById(id);

            setExpandedOfficer(id);
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
            <div className="content">
                <div className="page-header">
                    <h1 className="page-title">Officer Management</h1>

                    <button
                        className="officer-btn btn-primary"
                        onClick={() => setShowCreate(!showCreate)}
                    >
                        {showCreate ? "Close Form" : "+ Create Officer"}
                    </button>
                </div>
                <hr />
                <div className="officer-filters-toolbar">

                    <input
                        type="search"
                        className="officer-input-search"
                        placeholder="Search Officers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="officer-select-filter"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="name">Name A-Z</option>
                    </select>

                    <button
                        className="officer-btn btn-secondary"
                        onClick={() => {
                            setSearch("");
                            setSort("");
                        }}
                    >
                        Reset
                    </button>

                </div>
                <hr />
                <div className="issue-list">
                    <div className={`issue-card ${showCreate ? "expanded" : ""}`}>

                        <div
                            className="issue-header"
                            onClick={() => setShowCreate(!showCreate)}
                        >

                            <div className="issue-header-left">
                                <h3>Create Officer</h3>

                                <span className="issue-category">
                                    New Account
                                </span>
                            </div>

                            <div className="issue-header-right">
                                <span className="expand-icon">
                                    {showCreate ? "−" : "+"}
                                </span>
                            </div>

                        </div>

                        <div className={`issue-details ${showCreate ? "open" : ""}`}>

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

                            <div className="issue-actions">
                                <button
                                    className="officer-btn btn-primary"
                                    onClick={handleCreate}
                                >
                                    Create Officer
                                </button>
                            </div>

                        </div>

                    </div>
                    <hr />
                    {officers.map((officer) => (

                        <div
                            key={officer._id}
                            className={`issue-card ${expandedOfficer === officer._id
                                ? "expanded"
                                : ""
                                }`}
                        >

                            <div
                                className="issue-header"
                                onClick={() => handleView(officer._id)}
                            >

                                <div className="issue-header-left">

                                    <h3>{officer.name}</h3>

                                    <span className="issue-category">
                                        {officer.role}
                                    </span>

                                </div>

                                <div className="issue-header-right">

                                    <span className="officer-status-badge assigned">
                                        Active
                                    </span>

                                    <span className="expand-icon">
                                        {expandedOfficer === officer._id ? "−" : "+"}
                                    </span>

                                </div>

                            </div>

                            <div
                                className={`issue-details ${expandedOfficer === officer._id
                                    ? "open"
                                    : ""
                                    }`}
                            >

                                {selectedOfficer?._id === officer._id && (

                                    <>
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

                                                <span>
                                                    {selectedOfficer._id}
                                                </span>
                                            </div>

                                        </div>

                                        <div className="issue-actions">

                                            <button
                                                className="officer-btn btn-primary"
                                                onClick={handleUpdate}
                                            >
                                                Update
                                            </button>

                                            <button
                                                className="officer-btn btn-danger"
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
}

export default OfficerManagement;