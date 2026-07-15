import React from "react";
import { useNavigate } from "react-router-dom";
import IssueImage from "./IssueImage"; 

function IssueCard({ issue }) {
  const navigate = useNavigate();

  return (
    <div className="issue-card" style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "8px", margin: "16px 0" }}>
      
      {/* Dynamic Image component taking issueId as parameter */}
      <IssueImage issueId={issue._id} />

      <h2>{issue.title}</h2>
      <p>{issue.description}</p>
      <p><strong>Category:</strong> {issue.category}</p>
      <p><strong>Status:</strong> {issue.status}</p>
      <p><strong>Location:</strong> {issue.location}</p>
      <p><strong>Votes:</strong> {issue.votes}</p>

      <button type="button"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/issue/${issue._id}/report`);
        }}
      >
        Report
      </button>
    </div>
  );
}

export default IssueCard;