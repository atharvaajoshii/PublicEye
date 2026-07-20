//aak
import IssueForm from "../components/IssueForm";
import { useNavigate } from "react-router-dom"
import { GoChevronLeft } from "react-icons/go";
import React from "react";
import "../styles/adithya_css/report-form.css"
function ReportIssue() {
    const navigate = useNavigate();
    return (
        <div>
            <main className="dashboard-content">
                <div className="page-header">
                    <h1>Report an Issue</h1>
                </div>
                <IssueForm />
            </main>
        </div>
    );
}

export default ReportIssue;