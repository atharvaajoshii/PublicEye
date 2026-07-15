import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import toast from 'react-hot-toast';
import "../../styles/atharva.css";
import DetailsOverlay from "../../components/DetailsOverlay";
function Reports() {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const res = await adminService.getAllReports();
            setReports(res.data.reports);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const handleView = async (id) => {
        try {
            const res = await adminService.getReportById(id);
            setSelectedReport(res.data.report);
        } catch (err) {
            console.log(err);
        }
    };

    const handleApprove = async () => {
        if (!selectedReport) return;

        try {
            await adminService.approveReport(selectedReport._id);
            await fetchReports();
            setSelectedReport(null);
            toast.success("Report approved successfully");
        } catch (err) {
            console.log(err);
            toast.error("failed to approve")
        }
    };

    const handleReject = async () => {
        if (!selectedReport) return;

        try {
            await adminService.rejectReport(selectedReport._id);
            await fetchReports();
            setSelectedReport(null);
            toast.success("Report rejected successfully");
        } catch (err) {
            console.log(err);
            toast.error("failed to reject")
        }
    };

    if (loading) {
        return (
            <div className="loading">
                Loading...
            </div>
        );
    }

    return (
        <div className="main user-management">
            <div className="content">
                <h1 className="page-title">
                    Report Management
                </h1>

                <div className="table-section">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Issue</th>
                                <th>Officer</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reports.map((report) => (
                                <tr
                                    key={report._id}
                                    className={
                                        selectedReport?._id === report._id
                                            ? "selected-row"
                                            : ""
                                    }
                                >
                                    <td>{report.issue?.title}</td>

                                    <td>{report.officer?.name}</td>

                                    <td>{report.reason}</td>

                                    <td>
                                        <span
                                            className={`status ${report.status.toLowerCase()}`}
                                        >
                                            {report.status}
                                        </span>
                                    </td>

                                    <td className="actions">
                                        <button
                                            onClick={() =>
                                                handleView(report._id)
                                            }
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedReport && (
                    <DetailsOverlay
                        open={true}
                        title="Report Details"
                        onClose={() => setSelectedReport(null)}
                        actions={
                            <>
                                <button
                                    onClick={handleApprove}
                                    disabled={selectedReport.status !== "Pending"}
                                    className={
                                        selectedReport.status !== "Pending"
                                            ? "disabled-btn"
                                            : ""
                                    }
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={handleReject}
                                    disabled={selectedReport.status !== "Pending"}
                                    className={
                                        selectedReport.status !== "Pending"
                                            ? "disabled-btn"
                                            : ""
                                    }
                                >
                                    Reject
                                </button>

                                <button
                                    onClick={() => setSelectedReport(null)}
                                >
                                    Close
                                </button>
                            </>
                        }
                    >
                        <section className="overlay-section">
                            <h3>Issue Information</h3>

                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Issue</label>
                                    <span>{selectedReport.issue?.title}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Description</label>
                                    <span>
                                        {selectedReport.issue?.description}
                                    </span>
                                </div>

                                <div className="detail-item">
                                    <label>Status</label>
                                    <span>{selectedReport.status}</span>
                                </div>
                            </div>
                        </section>

                        <hr className="overlay-divider" />

                        <section className="overlay-section">
                            <h3>Officer Information</h3>

                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Name</label>
                                    <span>
                                        {selectedReport.officer?.name}
                                    </span>
                                </div>

                                <div className="detail-item">
                                    <label>Email</label>
                                    <span>
                                        {selectedReport.officer?.email}
                                    </span>
                                </div>
                            </div>
                        </section>

                        <hr className="overlay-divider" />

                        <section className="overlay-section">
                            <h3>Report Information</h3>

                            <div className="detail-grid">
                                <div className="detail-item">
                                    <label>Reason</label>
                                    <span>{selectedReport.reason}</span>
                                </div>

                                <div className="detail-item">
                                    <label>Remarks</label>
                                    <span>
                                        {selectedReport.description || "-"}
                                    </span>
                                </div>
                            </div>
                        </section>
                    </DetailsOverlay>
                )}
            </div>
        </div>
    );
}

export default Reports;