import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import IssueCard from "../components/IssueCard";
import "../styles/adithya_css/all_issues.css";
function AllIssues() {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchAllIssues = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/issues/all",
                    { withCredentials: true }
                );
                setIssues(res.data.issues || []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllIssues();
    }, []);

    return (
        <div className="dashboard-layout">
            <main className="dashboard-content">
                <div className="page-header">
                    <h1>All Issues</h1>
                    <p>Browse and track reported civic issues.</p>
                </div>
                <div className="issues-container">
                    {issues.map((issue) => (
                        <IssueCard key={issue._id} issue={issue} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default AllIssues;