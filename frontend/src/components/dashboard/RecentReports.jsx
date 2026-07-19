import React from "react";
import { FaLocationDot } from "react-icons/fa6";

function RecentReports(props) {
    // props.issues.map((issue) => {
    //console.log(issue)//just for learning purpuse tos ee if it works let it be here to understand the code 
    // })
    if (props.issues.length === 0) {
        return (
            <div className="card recent-reports">
                <div className="reports-header">
                    <h2>Recent Reports</h2>
                </div>
                <p className="empty-state">
                    You haven't submitted any reports yet.
                </p>
            </div>
        )
    }
    const getProgress = (status) => {
        switch (status) {
            case "Pending":
                return 25;
            case "In Progress":
                return 60;
            case "Resolved":
                return 100;
            default:
                return 0;
        }
    };
    return (
        <div className="card recent-reports">
            <div className="reports-header">
                <h2>Recent Reports</h2>
            </div>
            {props.issues.slice(0,3).map((issue) => (
                <div key={issue._id} className="report-item">
                    <div className="report-top">
                        <h3>{issue.title}</h3>

                        <span className={`status-badge ${issue.status.toLowerCase().replace(" ", "-")}`}>
                            {issue.status}
                        </span>
                    </div>
                    <p className="report-description">
                         {issue.description.slice(0,70)}
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
                    </div>
                     <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${getProgress(issue.status)}%`
                                }}
                            />
                        </div>
                </div>
            ))}
        </div>
    )
}
export default RecentReports;