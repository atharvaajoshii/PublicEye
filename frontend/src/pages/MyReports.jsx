import React, { useEffect, useState } from "react";
import issueService from "../services/issueService";
import { FaLocationDot } from "react-icons/fa6";
function MyReports() {
    const [issues, setIssues] = useState([]);
    useEffect(() => {
        fetchMyReports();
    }, []);
    const fetchMyReports = async () => {
        try {
            const res = await issueService.getUserIssues();
            setIssues(res.userIssues);
        } catch (err) {
            console.log(err);
        }
    };
    return (
    <div className="card recent-reports">
        <div className="reports-header">
            <h2>My Reports</h2>
        </div>
        {issues.length === 0 ? (
            <p className="empty-state">
                You haven't submitted any reports yet.
            </p>
        ) : (
            issues.map((issue) => (
                <div key={issue._id} className="report-item">
                    <div className="report-top">
                        <h3>{issue.title}</h3>
                        <span
                            className={`status-badge ${issue.status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                        >
                            {issue.status}
                        </span>
                    </div>
                    <p className="report-description">
                        {issue.description?.slice(0, 70)}
                    </p>
                    <div className="report-meta">
                        <span className="report-category">
                            {issue.category}
                        </span>
                        <span>•</span>
                        <span className="report-location">
                            <FaLocationDot />
                            {issue.location}
                        </span>
                        <span>•</span>
                        <span>
                            {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${
                                    issue.status === "Pending"
                                        ? 25
                                        : issue.status === "In Progress"
                                        ? 60
                                        : issue.status === "Resolved"
                                        ? 100
                                        : 0
                                }%`,
                            }}
                        />
                    </div>
                </div>
            ))
        )}
    </div>
);
}
export default MyReports;


//gpt wrote this one later need to be changed 