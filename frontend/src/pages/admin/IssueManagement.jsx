import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import Sidebar from "../../components/Sidebar";
import toast from 'react-hot-toast';
import "../../styles/atharva.css"

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

            setIssueTrack(null);
            setSelectedOfficer("");
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };
    if (loading)
        return (
            <div>
                Loading...
            </div>
        );

    return (
        <div className="users-table">
            <Sidebar />
            <div className="content">
                <h1 className="page-title">
                    Issue Management
                </h1>
                <div className="management-container">
                    {/* Issues Table */}
                    <div className="table-section">
                        <table className="issues-table">
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
                                            <span className="status">
                                                {issue.status}
                                            </span>
                                        </td>
                                        <td className="actions">
                                            <button
                                                onClick={() =>
                                                    handleView(issue._id)
                                                }
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(issue._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Details Panel */}
                    <div className="details-section">
                        <h2>Issue Details</h2>
                        {selectedIssue ? (
                            <div className="details-card">
                                <h3>Issue Information</h3>
                                <div className="detail-item">
                                    <label>Title</label>
                                    <p>{selectedIssue.title}</p>
                                </div>
                                <div className="detail-item">
                                    <label>Description</label>
                                    <p>{selectedIssue.description}</p>
                                </div>
                                <div className="detail-item">
                                    <label>Category</label>
                                    <p>{selectedIssue.category}</p>
                                </div>
                                <div className="detail-item">
                                    <label>Status</label>
                                    <p>{selectedIssue.status}</p>
                                </div>
                                <div className="detail-item">
                                    <label>Location</label>
                                    <p>{selectedIssue.location}</p>
                                </div>
                                <hr />
                                <h3>Assigned Officer</h3>
                                <div className="detail-item">
                                    <label>Name</label>
                                    <p>
                                        {issueTrack?.officer?.name ||
                                            "Not Assigned"}
                                    </p>
                                </div>
                                <div className="detail-item">
                                    <label>Email</label>
                                    <p>
                                        {issueTrack?.officer?.email || "-"}
                                    </p>
                                </div>
                                <hr />
                                <h3>Assignment</h3>
                                <div className="detail-item">
                                    <label>Select Officer</label>
                                    <select
                                        value={selectedOfficer}
                                        onChange={(e) =>
                                            setSelectedOfficer(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            Select Officer
                                        </option>

                                        {officers.map((officer) => (
                                            <option
                                                key={officer._id}
                                                value={officer._id}
                                            >
                                                {officer.name}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                                <button
                                    onClick={handleAssign}
                                    disabled={
                                        selectedIssue.status === "Resolved"
                                    }
                                >
                                    {selectedIssue.status === "Assigned"
                                        ? "Reassign Officer"
                                        : "Assign Officer"}
                                </button>
                            </div>
                        ) : (

                            <div className="empty-state">
                                Select an issue to view details.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default IssueManagement;