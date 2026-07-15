// Atmika

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import adminService from "../../services/adminService";
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

    return (
        <div>
            <div className="dashboard">
                <div className="stats-container">
                    <div className="stat-card">
                        <h1>Total Officers</h1>
                        <p>{stats.totalOfficers}</p>
                    </div>
                    <div className="stat-card">
                        <h1>Total Users</h1>
                        <p>{stats.totalUsers}</p>
                    </div>
                    <div className="stat-card">
                        <h1>Total Issues</h1>
                        <p>{stats.totalIssues}</p>
                    </div>
                </div>
                <div className="issue-sections">
                    <div className="issue-box">
                        <h1>Pending Issues</h1>
                        {pendingIssues.map((issue) => (
                            <div
                                key={issue._id}
                                className="issue-card"
                                onClick={() => navigate(`/issue/${issue._id}`)}
                            >
                                <h3>{issue.title}</h3>
                                <p>Votes: {issue.votes}</p>
                            </div>
                        ))}
                    </div>
                    <div className="issue-box">
                        <h1>Resolved Issues</h1>
                        {resolvedIssues.map((issue) => (
                            <div
                                key={issue._id}
                                className="issue-card"
                                onClick={() => navigate(`/issue/${issue._id}`)}
                            >
                                <h3>{issue.title}</h3>
                            </div>
                        ))}
                    </div>
                    <div className="issue-box">
                        <h1>Issues Reported Today</h1>
                        {reportedToday.map((issue) => (
                            <div
                                key={issue._id}
                                className="issue-card"
                                onClick={() => navigate(`/issue/${issue._id}`)}
                            >
                                <h3>{issue.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard