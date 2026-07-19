import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import toast from 'react-hot-toast';
import "../../styles/atharva.css"
import "../../styles/overlay.css"
import DetailsOverlay from "../../components/DetailsOverlay";
import IssueImage from "../../components/IssueImage";

function IssueManagement() {
    const [issues, setIssues] = useState([]);
    const [officers, setOfficers] = useState([]);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [selectedOfficer, setSelectedOfficer] = useState("");
    const [loading, setLoading] = useState(true);
    const [issueTrack, setIssueTrack] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);

            const [issueRes, officerRes] = await Promise.all([
                adminService.getAllIssues(),
                adminService.getAllOfficers(),
            ]);

            setIssues(issueRes.data.issues);
            setOfficers(officerRes.data.officers);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleView = async (id) => {
        try {
            const res = await adminService.getIssueById(id);

            setSelectedIssue(res.data.issue);
            setIssueTrack(res.data.issueTrack);

            setSelectedOfficer(
                res.data.issueTrack?.officer?._id || ""
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleAssign = async () => {
        if (!selectedOfficer || !selectedIssue) return;

        try {
            if (selectedIssue.status === "Assigned") {
                await adminService.reassignOfficer(
                    selectedIssue._id,
                    selectedOfficer
                );
            } else {
                await adminService.assignOfficer(
                    selectedIssue._id,
                    selectedOfficer
                );
            }
            await fetchData();
            await handleView(selectedIssue._id);
            toast.success("Officer assigned successfully");
        } catch (err) {
            console.log(err);
            toast.error("error assigning officer")
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this issue?")) return;

        try {
            await adminService.deleteIssue(id);
            toast.success("Issue deleted successfully");
            setIssueTrack(null);
            setSelectedOfficer("");
            fetchData();
        } catch (err) {
            console.log(err);
            toast.error("error deleting Issue")
        }
    };
    if (loading)
        return (
            <div className="loading main">
                Loading...
            </div>
        );

    return (
        <div className="officer-dashboard-container">
            <h1 className="officer-dashboard-main-title">
                Issue Management
            </h1>
            <div className="officer-section-panel">
                <table className="officer-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue) => (
                            <tr
                                key={issue._id}
                                className={
                                    selectedIssue?._id === issue._id
                                        ? "selected-row"
                                        : ""
                                }
                            >
                                <td>{issue.title}</td>
                                <td>{issue.category}</td>
                                <td>
                                    <span className={`officer-status-badge ${issue.status.toLowerCase()}`}>
                                        {issue.status}
                                    </span>
                                </td>
                                <td className="actions">
                                    <button
                                        className="officer-btn btn-primary"
                                        onClick={() => handleView(issue._id)}
                                    >
                                        View
                                    </button>

                                    <button
                                        className="officer-btn btn-danger"
                                        onClick={() => handleDelete(issue._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Details Panel */}
                {selectedIssue && (
                    <DetailsOverlay
                        open={true}
                        title="Issue Details"
                        onClose={() => {
                            setSelectedIssue(null);
                            setIssueTrack(null);
                            setSelectedOfficer("");
                        }}
                        actions={
                            <>
                                <button
                                    onClick={handleAssign}
                                    disabled={selectedIssue.status === "Resolved"}
                                >
                                    {selectedIssue.status === "Assigned"
                                        ? "Reassign Officer"
                                        : "Assign Officer"}
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedIssue(null);
                                        setIssueTrack(null);
                                        setSelectedOfficer("");
                                    }}
                                >
                                    Close
                                </button>
                            </>
                        }
                    >
                        <section className="officer-section-panel overlay-section">
                            <h3>Issue Information</h3>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Title</label>
                                    <span>{selectedIssue.title}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Description</label>
                                    <span>{selectedIssue.description}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Category</label>
                                    <span>{selectedIssue.category}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Status</label>
                                    <span>{selectedIssue.status}</span>
                                </div>
                                <div className="detail-item">
                                    <label>Location</label>
                                    <span>{selectedIssue.location}</span>
                                </div>
                            </div>
                        </section>
                        <hr className="overlay-divider" />
                        <section className="overlay-section">
                            <h3>Assigned Officer</h3>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Name</label>
                                    <span>{issueTrack?.officer?.name || "Not Assigned"}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Email</label>
                                    <span>{issueTrack?.officer?.email || "-"}</span>
                                </div>
                            </div>
                        </section>
                        <hr className="overlay-divider" />
                        <section className="overlay-section">
                            <h3>Assignment</h3>
                            <div className="detail-item">
                                <label>Select Officer</label>
                                <select
                                    value={selectedOfficer}
                                    onChange={(e) => setSelectedOfficer(e.target.value)}
                                >
                                    <option value="">Select Officer</option>

                                    {officers.map((officer) => (
                                        <option key={officer._id} value={officer._id}>
                                            {officer.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </section>
                        <hr className="overlay-divider" />
                        <section className="overlay-section">
                            <h3>Issue Image</h3>

                            <IssueImage issueId={selectedIssue._id} />
                        </section>
                    </DetailsOverlay>
                )}
            </div>

        </div>
    );
}
export default IssueManagement;