import React from "react";
import { useNavigate } from "react-router-dom";
import IssueImage from "./IssueImage";

function IssueCard({ issue }) {
  const navigate = useNavigate();

  return (
    <div className="issue-card" >

      {/* Dynamic Image component taking issueId as parameter */}
      <IssueImage issueId={issue._id} />
      <div className="issue-content">
        <div className="issue-header">
          <h2>{issue.title}</h2>
          <span
            className={`status-badge ${issue.status.toLowerCase().replace(" ", "-")}`} >
            {issue.status}
          </span>
        </div>
        <p className="issue-description">

          {issue.description.length > 120 ? issue.description.slice(0, 120) + "..." : issue.description}
        </p>
        <div className="issue-meta">
          <span>{issue.category}</span>
          <span>•</span>
          <span>{issue.location}</span>
          <span>•</span>
          <span>{issue.votes} Votes</span>
        </div>
      </div>

      <div className="issue-footer">
        <button type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/issue/${issue._id}/report`);
          }}
        >
          Report
        </button>
      </div>
    </div>
  );
}

export default IssueCard;