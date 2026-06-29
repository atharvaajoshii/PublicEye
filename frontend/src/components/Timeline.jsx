//aak

import React from "react";

function Timeline({ status }) {
  const stages = [
    "Pending",
    "Assigned",
    "In Progress",
    "Resolved"
  ];

  return (
    <div>
      <h3>Status Timeline</h3>

      {stages.map((stage) => (
        <div key={stage}>
          {stage === status ? "➡️ " : ""}
          {stage}
        </div>
      ))}
    </div>
  );
}

export default Timeline;