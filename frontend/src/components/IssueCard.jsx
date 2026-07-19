import React from "react";
import IssueImage from "./IssueImage"; 

function IssueCard({ issue, isExpanded, onToggle }) {
    return (
        <div className={`issue-card ${isExpanded ? "active" : ""}`}>
            {/* Clickable Header/Row Summary */}
            <div className="issue-card-header" onClick={onToggle} style={{ cursor: "pointer" }}>
                <div className="issue-title-block">
                    <h3>{issue.title}</h3>
                    <span className={`status-badge ${issue.status.toLowerCase()}`}>
                        {issue.status}
                    </span>
                </div>
                <div className="issue-meta-summary">
                    <span> {issue.category}</span>
                    <span> {new Date(issue.createdAt).toLocaleDateString()}</span>
                    <span className="arrow-indicator">{isExpanded ? "▲" : "▼"}</span>
                </div>
            </div>

            {isExpanded && (
                <div className="issue-card-details">
                    <hr className="details-divider" />
                    
                    <div className="details-layout">
                        
                        <div className="details-image-section">
                            <IssueImage issueId={issue._id} />
                        </div>

                       
                        <div className="details-info-section">
                            <h4>Description</h4>
                            <p className="issue-description">{issue.description}</p>
                            
                            <div className="additional-meta">
                                <p><strong>Location:</strong> {issue.location || "Not specified"}</p>
                                <p><strong>Reported By:</strong> {issue.userId?.name || "Anonymous"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default IssueCard;