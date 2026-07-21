// Atmika

import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import adminService from "../../services/adminService";
import "../../styles/aakanksha.css"
import "../../styles/atharva.css"

function AdminDashboard() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOfficers: 0,
        totalIssues: 0
    })

    const [pendingIssues, setPendingIssues] = useState([]);
    const [resolvedIssues, setResolvedIssues] = useState([]);
    const [reportedToday, setReportedToday] = useState([]);

    useEffect(() => {
        fetchDashboard();
    }, [])

    const fetchDashboard = async () => {
        setLoading(true);
        try {

            const res = await adminService.getDashboard();

            setStats(res.data.stats);
            setPendingIssues(res.data.pendingIssues);
            setResolvedIssues(res.data.resolvedIssues);
            setReportedToday(res.data.reportedToday);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    if (loading) {
        return <div className="officer-loading">Loading Dashboard Space...</div>;
    }
return (
    <div className="officer-dashboard-container">

        <h1 className="officer-dashboard-main-title">
            Admin Dashboard
        </h1>

        <div className="officer-stats-grid admin-dashboard">
            <div className="officer-stat-card card-total">
                <h1>Total Officers</h1>
                <p>{stats.totalOfficers}</p>
            </div>

            <div className="officer-stat-card card-assigned">
                <h1>Total Users</h1>
                <p>{stats.totalUsers}</p>
            </div>

            <div className="officer-stat-card card-inprogress">
                <h1>Total Issues</h1>
                <p>{stats.totalIssues}</p>
            </div>
        </div>

        <div className="officer-content-layout">

            <div className="officer-section-panel">
                <h1 className="officer-panel-heading">
                    Pending Issues
                </h1>

                <div className="officer-panel-list">
                    {pendingIssues.map((issue) => (
                        <div
                            key={issue._id}
                            className="officer-static-item-card"
                            
                        >
                            <h3>{issue.title}</h3>

                            <p className="meta-text">
                                Votes: <strong>{issue.votes}</strong>
                            </p>

                            <p className="meta-text">
                                Status:
                                <span className="status-pill">
                                    Pending
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="officer-section-panel">
                <h1 className="officer-panel-heading">
                    Resolved Issues
                </h1>

                <div className="officer-panel-list">
                    {resolvedIssues.map((issue) => (
                        <div
                            key={issue._id}
                            className="officer-static-item-card"
                        >
                            <h3>{issue.title}</h3>

                            <p className="meta-text">
                                Status:
                                <span className="status-pill">
                                    Resolved
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="officer-section-panel">
                <h1 className="officer-panel-heading">
                    Issues Reported Today
                </h1>

                <div className="officer-panel-list">
                    {reportedToday.map((issue) => (
                        <div
                            key={issue._id}
                            className="officer-static-item-card"
                        >
                            <h3>{issue.title}</h3>

                            <p className="meta-text">
                                Created Today
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    </div>
);
}

export default AdminDashboard