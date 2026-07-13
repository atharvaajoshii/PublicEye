//aak

import React from "react";
import Timeline from "../components/Timeline";
import { useNavigate } from "react-router-dom"
import { GoChevronLeft } from "react-icons/go";

function IssueDetails() {
  const issue = {
    title: "Road Damage",
    description: "Large pothole near junction.",
    category: "Road",
    location: "Main Road",
    status: "Pending",
    votes: 5
  };
      const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>
        <GoChevronLeft />Back
      </button>


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