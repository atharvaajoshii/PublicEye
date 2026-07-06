import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitReport } from "../services/reportService";

function ReportForm() {
  const { issueId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reason: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitReport(issueId, formData);
      alert("Report submitted successfully");
      navigate("/officer/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit report");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Reason</label>
        <select
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
        >
          <option value="">Select Reason</option>
          <option value="Fake Report">Fake Report</option>
          <option value="Duplicate Issue">Duplicate Issue</option>
          <option value="Insufficient Evidence">Insufficient Evidence</option>
          <option value="Already Resolved">Already Resolved</option>
          <option value="Spam">Spam</option>
          <option value="Wrong Location">Wrong Location</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
        />
      </div>

      <button type="submit">Submit Report</button>
    </form>
  );
}

export default ReportForm;