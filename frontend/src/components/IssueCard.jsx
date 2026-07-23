import React, { useState, useEffect } from "react";
import IssueImage from "./IssueImage";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";
import issueService from "../services/issueService";
function IssueCard({ issue, rowExpanded, onToggle }) {
  const [votes, setVotes] = useState(issue.votes);
  useEffect(() => {
    setVotes(issue.votes);
  }, [issue.votes]);
  const handleSupport = async () => {
    try {
      const response = await issueService.voteIssue(issue._id);

      setVotes(response.votes);

      toast.success(response.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to support issue."
      );
    }
  };
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
            <div className="issue-support">
              <span> {votes} Supporters    </span>
              {issue.publicVoting ? (
                <button className="support-btn" onClick={handleSupport}>
                   Support
                </button>
              ) : (
                <button className="support-btn" disabled>
                  Voting Disabled
                </button>
              )}
            </div>
          </>

        )}
      </div>
    </div>
  );
}

export default IssueCard;
