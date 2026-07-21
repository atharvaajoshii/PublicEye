import React from "react";
import IssueImage from "./IssueImage";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
function IssueCard({ issue, rowExpanded, onToggle }) {
  return (
    <div className="issue-card">
      <div className="issue-card-header">
        <div className="issue-thumb">
          <IssueImage imageUrl={issue.image} />
        </div>

        <div className="issue-summary">
          <h3>{issue.title}</h3>

          <span
            className={`status-badge ${issue.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {issue.status}
          </span>

          <div className="issue-meta-summary">
            <span className="issue-category">
              {issue.category}
            </span>

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
            <p>{issue.description}</p>

            <p className="issue-location">
              <FaLocationDot />
              {issue.location}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default IssueCard;
