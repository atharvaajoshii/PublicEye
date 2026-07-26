//aak
import IssueForm from "../components/IssueForm";
import React from "react";
import "../styles/adithya_css/report-form.css"
function ReportIssue() {
    return (
        <div>
            <main className="dashboard-content">
                <div className="page-header">
                    <h1>Report an Issue</h1>
                    <p>Give the responsible officer what they need to act fast.</p>
                </div>
                <IssueForm />
            </main>
        </div>
    );
}

export default ReportIssue;