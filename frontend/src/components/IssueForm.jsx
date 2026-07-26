//aak

import React, { useState } from "react";
import { createIssue } from "./issueService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiType, FiAlignLeft, FiTag, FiImage, FiArrowRight } from "react-icons/fi";

import Map from "./Map";
import ImageDropzone from "./ImageDropzone";

const CATEGORIES = ["Road", "Garbage", "Water", "Electricity", "Street Light", "Other"];

function IssueForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    category: "",
    image: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.latitude || !formData.longitude) {
      toast.error("Pin a location on the map before submitting.");
      return;
    }

    if (!formData.category) {
      toast.error("Choose a category before submitting.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);
    data.append("category", formData.category);
    data.append("image", formData.image);

    setSubmitting(true);
    try {
      const result = await createIssue(data);
      toast.success("Issue reported successfully!");
      navigate("/all-issues");
      console.log(result);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit issue.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="issue-form-page">
      <div className="issue-form-shell">
        {/* Left — sticky location picker */}
        <aside className="issue-form-map-panel">
          <div className="issue-form-map-panel-head">
            <h2>Pin the location</h2>
            <p>Tap anywhere on the map to mark where the issue is</p>
          </div>
          <div className="issue-form-map-frame">
            <Map formData={formData} setFormData={setFormData} />
          </div>
        </aside>

        {/* Right — field cards */}
        <div className="issue-form-fields-panel">
          <form className="issue-form-grid" onSubmit={handleSubmit}>
            <div className="field-card">
              <label className="field-label" htmlFor="title">
                <FiType /> Title
              </label>
              <input
                id="title"
                className="field-input"
                type="text"
                name="title"
                placeholder="e.g. Pothole near the main junction"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-card">
              <label className="field-label" htmlFor="description">
                <FiAlignLeft /> Description
              </label>
              <textarea
                id="description"
                className="field-input field-textarea"
                name="description"
                placeholder="What's going on? Add any details that help responders."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-card">
              <label className="field-label">
                <FiTag /> Category
              </label>
              <div className="category-pills">
                {CATEGORIES.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    className={`category-pill ${formData.category === cat ? "is-selected" : ""}`}
                    onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-card">
              <label className="field-label">
                <FiImage /> Photo evidence
              </label>
              <ImageDropzone
                file={formData.image}
                onChange={(file) => setFormData((prev) => ({ ...prev, image: file }))}
              />
            </div>

            <button className="submit-btn" type="submit" disabled={submitting}>
              {submitting ? (
                <span className="submit-btn-spinner" />
              ) : (
                <>
                  Submit Issue <FiArrowRight />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IssueForm;