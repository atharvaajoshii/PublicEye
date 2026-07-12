// Atmika

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Sidebar from "../../components/Sidebar";

import AdminSidebar from "../../components/AdminSidebar"
import adminService from "../../services/adminService";

function AdminDashboard() {

    const navigate = useNavigate();

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
        try {

            const res = await adminService.getDashboard();

            setStats(res.data.stats);
            setPendingIssues(res.data.pendingIssues);
            setResolvedIssues(res.data.resolvedIssues);
            setReportedToday(res.data.reportedToday);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Sidebar />
            <div>
                <div >
                    <div>
                        <h1>Total Officers</h1>
                        <p>{stats.totalOfficers}</p>
                    </div>
                    <div>
                        <h1>Total Users</h1>
                        <p>{stats.totalUsers}</p>
                    </div>
                    <div>
                        <h1>Total Issues</h1>
                        <p>{stats.totalIssues}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h1>Pending Isssues</h1>
                        {pendingIssues.map((issue) => (
                            <div key={issue._id}
                                onClick={() => navigate(`/issue/${issue._id}`)}
                                style={{ cursor: "pointer" }}>
                                <h3>{issue?.title}</h3>
                                <p>Votes: {issue?.votes}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h1>Resolved Isssues</h1>
                        {resolvedIssues.map((issue) => (
                            <div key={issue._id}
                                onClick={() => navigate(`/issue/${issue._id}`)}
                                style={{ cursor: "pointer" }}>
                                <h3>{issue?.title}</h3>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h1>Isssues Reported Today</h1>
                        {reportedToday.map((issue) => (
                            <div key={issue._id}
                                onClick={() => navigate(`/issue/${issue._id}`)}
                                style={{ cursor: "pointer" }}>
                                <h3>{issue?.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard