//aak

import React, { useState } from "react";
import { createIssue } from "./issueService";
import toast from 'react-hot-toast';
import Map from "./Map";

function IssueForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    category: "",
    publicVoting: false,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, //this is called computed property name
    });
  };
  //... is callled spread operator. w/o it other fields wud disappear


  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);
    data.append("category", formData.category);
    data.append("publicVoting", formData.publicVoting);
    data.append("image", formData.image);

    try {
      const result = await createIssue(data);

      toast.success("Issue reported successfully!");

      console.log(result);

    } catch (error) {
      console.error(error);

      toast.error("Failed to submit issue.");
    }
  };
  return (
    <form className="issue-form" onSubmit={handleSubmit}>

      <div className="form-group">
        <label className="form-label">Title</label>
        <input className="form-input"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="form-input"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="map">
        <Map
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Location</label>
        <input
          className="form-input"
          type="text"
          name="location"
          value={formData.location}
          readOnly
          placeholder="Click on the map to select a location"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Latitude</label>
        <input
          className="form-input"
          type="number"
          value={formData.latitude}
          readOnly
        />
      </div>

      <div className="form-group">
        <label className="form-label">Longitude</label>
        <input
          className="form-input"
          type="number"
          value={formData.longitude}
          readOnly
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <select className="form-input"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Road">Road</option>
          <option value="Garbage">Garbage</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Street Light">Street Light</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Upload Image</label>
        <input className="form-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <div className="checkbox-group">

        <input
          type="checkbox"
          name="publicVoting"
          checked={formData.publicVoting}
          onChange={handleChange}
        />
        <label htmlFor="publicVoting">
          Enable Public Voting
        </label>
      </div>


      <button className="primary-btn" type="submit">
        Submit Issue
      </button>
    </form>
  );
}

export default IssueForm;