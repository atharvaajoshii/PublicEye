//aak

import React from "react";
import Timeline from "../components/Timeline";

function IssueDetails() {
  const issue = {
    title: "Road Damage",
    description: "Large pothole near junction.",
    category: "Road",
    location: "Main Road",
    status: "Pending",
    votes: 5
  };

  return (
    <div>
      <h1>{issue.title}</h1>

      <p>{issue.description}</p>

      <p>Category: {issue.category}</p>

      <p>Location: {issue.location}</p>

      <p>Status: {issue.status}</p>

      <p>Votes: {issue.votes}</p>

      <Timeline status={issue.status} />
    </div>
  );
}

export default IssueDetails;