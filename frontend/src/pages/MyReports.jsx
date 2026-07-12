import React, { useEffect, useState } from "react";
import issueService from "../services/issueService";
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
        <div>
            
            <h1>My Reports</h1>
            {issues.map((issue) => (
                <div key={issue._id}>
                    <h3>{issue.title}</h3>
                    <p>{issue.category}</p>
                    <p>Status: {issue.status}</p>
                    <p>Votes: {issue.votes}</p>
                    <p>
                        Date:{" "}
                        {new Date(issue.createdAt).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>
    );
}
export default MyReports;


//gpt wrote this one later need to be changed 