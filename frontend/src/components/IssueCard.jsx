//aak

import React from "react";

function IssueCard({ issue }) {
  return (
    <div>
      <h2>{issue.title}</h2>

      <p>{issue.description}</p>

      <p>
        <strong>Category:</strong> {issue.category}
      </p>

      <p>
        <strong>Status:</strong> {issue.status}
      </p>

      <p>
        <strong>Location:</strong> {issue.location}
      </p>

      <p>
        <strong>Votes:</strong> {issue.votes}
      </p>
    </div>
  );
}

export default IssueCard;