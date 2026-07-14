import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import IssueCard from "../components/IssueCard"; // 1. Import your IssueCard component

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
        <div>
            <Sidebar />
            <h1>All Issues</h1>
            
            {/* 2. Map the issues directly into your IssueCard component */}
            <div className="issues-container">
                {issues.map((issue) => (
                    <IssueCard key={issue._id} issue={issue} />
                ))}
            </div>
        </div>
    );
}

export default AllIssues;