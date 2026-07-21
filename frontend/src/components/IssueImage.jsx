import React from "react";
import "../styles/atharva.css";

function IssueImage({ imageUrl }) {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
  };

  if (!imageUrl) {
    return (
      <img
        src="https://placehold.co/600x400?text=No+Image+Available"
        alt="No evidence available"
        className="issue-image"
      />
    );
  }

  return (
    <a
      href={imageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="issue-image-link"
    >
      <img
        src={imageUrl}
        alt="Civic Issue Evidence"
        onError={handleImageError}
        className="issue-image"
      />

      <div className="image-overlay">
        View Image
      </div>
    </a>
  );
}

export default IssueImage;