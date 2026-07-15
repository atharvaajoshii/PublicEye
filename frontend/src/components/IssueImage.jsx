import React, { useState, useEffect } from "react";
import axios from "axios";

function IssueImage({ issueId }) {
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Updated to match your new folder route
  const BASE_URL = "http://localhost:5000/issue-images";

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/issues/${issueId}`, {
          withCredentials: true,
        });

        if (response.data.success && response.data.issue) {
          setImageName(response.data.issue.image);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading issue image:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (issueId) {
      fetchIssueDetails();
    }
  }, [issueId]);

  const handleImageError = (e) => {
    e.target.onerror = null; 
    e.target.src = "https://placehold.co/600x400?text=Image+Not+Found";
  };

  if (loading) return <div className="image-loader">Loading...</div>;

  if (error || !imageName) {
    return (
      <img 
        src="https://placehold.co/600x400?text=No+Image+Available" 
        alt="No evidence available"
        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
      />
    );
  }

  return (
    <img
      src={`${BASE_URL}/${imageName}`}
      alt="Civic Issue Evidence"
      onError={handleImageError}
      style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
    />
  );
}

export default IssueImage;