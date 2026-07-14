//aak
import IssueForm from "../components/IssueForm";
import { useNavigate } from "react-router-dom"
import { GoChevronLeft } from "react-icons/go";
import React from "react";
function ReportIssue() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate(-1)}>
                <GoChevronLeft />Back
            </button>
            <h1>Report an Issue</h1>
            <IssueForm />
        </div>
    );
}

export default ReportIssue;