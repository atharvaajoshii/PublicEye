import React from "react";

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
                    No reports submitted yet.
                </p>
            </div>
        )
    }
    return (
        <div className="card recent-reports">
            <div className="reports-header">
                <h2>Recent Reports</h2>
            </div>
            {props.issues.map((issue) => (
                <div key={issue._id} className="report-item">
                    <div className="report-top">
                        <h3>{issue.title}</h3>

                        <span className={`status-badge ${issue.status.toLowerCase().replace(" ", "-")}`}>
                            {issue.status}
                        </span>
                    </div>
                    <p className="report-description">
                        {issue.description}
                    </p>
                    <div className="report-meta">

                        <span className="report-category">
                            {issue.category}
                        </span>

                        <span>•</span>

                        <span className="report-location">
                            {issue.location}
                        </span>

                    </div>
                </div>
            ))}
        </div>
    )
}
export default RecentReports;