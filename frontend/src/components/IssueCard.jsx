import React from "react";
import IssueImage from "./IssueImage";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function IssueCard({ issue, rowExpanded, onToggle }) {
  return (
    <div className="issue-card">
      <div className="issue-card-header">
        <div className="issue-thumb">
          <IssueImage issueId={issue._id} />
        </div>

        <div className="issue-summary">
          <h3>{issue.title}</h3>

          <span className={`status-badge ${issue.status.toLowerCase()}`}>
            {issue.status}
          </span>

          <div className="issue-meta-summary">
            <span>{issue.category}</span>

            <span>•</span>

            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>

            <button className="expand-btn" onClick={onToggle}>
              {rowExpanded ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
        </div>
      </div>

      <div className="issue-card-details">
        {rowExpanded && (
          <>
          <hr></hr>

            <h4>Description</h4>

            <p>{issue.description}</p>

            <p>
              <strong>Location:</strong> {issue.location}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default IssueCard;
