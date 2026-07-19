import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitReport } from "../services/reportService";
import toast from 'react-hot-toast';

import "../styles/aakanksha.css"; 

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
      toast.success("Report submitted successfully");
      navigate("/officer/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit report");
    }
  };

  return (
    <div className="report-form-page-wrapper">
      <div className="report-form-container">
        <h2 className="report-form-title">Report Issue Validity</h2>
        <p className="report-form-subtitle">
          Flag this issue if you notice incorrect data, spam, duplicates, or other discrepancies.
        </p>

        <form onSubmit={handleSubmit} className="report-form-element">
          <div className="report-form-group">
            <label className="report-form-label">Reason for Flagging</label>
            <select
              className="report-form-select"
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

          <div className="report-form-group">
            <label className="report-form-label">Detailed Description</label>
            <textarea
              className="report-form-textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide context or details about why you are flagging this issue..."
              rows={5}
            />
          </div>

          <div className="report-form-actions">
            <button 
              type="button" 
              className="report-btn report-btn-cancel"
              onClick={() => navigate(-1)} // Navigates back to the dashboard/previous page
            >
              Cancel
            </button>
            <button type="submit" className="report-btn report-btn-submit">
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportForm;