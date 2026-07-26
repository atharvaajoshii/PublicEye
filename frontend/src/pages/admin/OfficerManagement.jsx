import React, { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import toast from "react-hot-toast";
import ButtonLoader from "../../components/ButtonLoader";
import { FiUser, FiMail, FiLock, FiMapPin, FiPhone, FiPlus, FiX } from "react-icons/fi";

const EMPTY_FORM = {
  name: "",
  email: "",
  password: "",
  department: "",
  location: "",
  phone: "",
};

function OfficerManagement() {
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [expandedOfficer, setExpandedOfficer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});

  const fetchOfficers = async () => {
    try {
      setLoading(true);
      const res = await adminService.getAllOfficers({ search: debouncedSearch, sort });
      setOfficers(res.data.officers);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load officers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchOfficers();
  }, [debouncedSearch, sort]);

  const loadOfficerDetails = async (id) => {
    const res = await adminService.getOfficerById(id);
    setSelectedOfficer(res.data.officer);
    setFormData({
      name: res.data.officer.name || "",
      email: res.data.officer.email || "",
      password: "",
      department: res.data.officer.department || "",
      location: res.data.officer.location || "",
      phone: res.data.officer.phone || "",
    });
    setFormErrors({});
  };
  
  const handleView = async (id) => {
    try {
      if (expandedOfficer === id) {
        setExpandedOfficer(null);
        setSelectedOfficer(null);
        return;
      }
      setExpandedOfficer(id);
      await loadOfficerDetails(id);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load officer details");
    }
  };
  
  const handleUpdate = async () => {
    if (!selectedOfficer) return;
    if (!validate({ requirePassword: false })) return;
    try {
      setUpdating(true);
      await adminService.updateOfficer(selectedOfficer._id, formData);
      toast.success("Officer updated successfully");
      fetchOfficers();
      await loadOfficerDetails(selectedOfficer._id); // refresh, don't toggle
    } catch (err) {
      console.log(err);
      toast.error("Error updating officer");
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const validate = ({ requirePassword }) => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email";
    if (requirePassword && !formData.password) errors.password = "Password is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    if (!validate({ requirePassword: true })) return;
    try {
      setCreating(true);
      const res = await adminService.createOfficer(formData);
      setFormData(EMPTY_FORM);
      toast.success(`${res.data.officer.name} added successfully`);
      setShowCreate(false);
      fetchOfficers();
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Failed to create officer");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedOfficer) return;
    const name = selectedOfficer.name;
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    try {
      setDeleting(true);
      await adminService.deleteOfficer(selectedOfficer._id);
      toast.success(`Officer ${name} deleted successfully`);
      setSelectedOfficer(null);
      setExpandedOfficer(null);
      setFormData(EMPTY_FORM);
      fetchOfficers();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete officer");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="officer-loading">Loading...</div>;

  return (
    <div className="main user-management">
      <div className="content">
        <div className="page-header">
          <h1 className="page-title">Officer Management</h1>
          <button
            className="officer-btn btn-primary"
            onClick={() => setShowCreate(!showCreate)}
          >
            {showCreate ? (<><FiX /> Close Form</>) : (<><FiPlus /> Create Officer</>)}
          </button>
        </div>

        <div className="officer-filters-toolbar">
          <input
            type="search"
            className="officer-input-search"
            placeholder="Search officers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="officer-select-filter"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
          </select>
          <button
            className="officer-btn btn-secondary"
            onClick={() => { setSearch(""); setSort(""); }}
          >
            Reset
          </button>
        </div>

        <div className="issue-list">
          <div className={`issue-card create-card ${showCreate ? "expanded" : ""}`}>
            <div className="issue-header" onClick={() => setShowCreate(!showCreate)}>
              <div className="issue-header-left">
                <h3>Create Officer</h3>
                <span className="issue-category">New Account</span>
              </div>
              <div className="issue-header-right">
                <span className="expand-icon">{showCreate ? "−" : "+"}</span>
              </div>
            </div>

            <div className={`issue-details ${showCreate ? "open" : ""}`}>
              <div className="detail-grid">
                <div className="detail-item">
                  <label><FiUser /> Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? "input-error" : ""}
                    placeholder="Full name"
                  />
                  {formErrors.name && <span className="field-error">{formErrors.name}</span>}
                </div>

                <div className="detail-item">
                  <label><FiMail /> Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? "input-error" : ""}
                    placeholder="officer@publiceye.gov"
                  />
                  {formErrors.email && <span className="field-error">{formErrors.email}</span>}
                </div>

                <div className="detail-item">
                  <label><FiLock /> Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={formErrors.password ? "input-error" : ""}
                    placeholder="Set a password"
                  />
                  {formErrors.password && <span className="field-error">{formErrors.password}</span>}
                </div>

                <div className="detail-item">
                  <label><FiMapPin /> Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. Roads & Infrastructure"
                  />
                </div>

                <div className="detail-item">
                  <label><FiMapPin /> Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Assigned jurisdiction"
                  />
                </div>

                <div className="detail-item">
                  <label><FiPhone /> Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Contact number"
                  />
                </div>
              </div>

              <div className="issue-actions">
                <button className="officer-btn btn-primary" onClick={handleCreate} disabled={creating}>
                  {creating ? <ButtonLoader text="Creating..." /> : "Create Officer"}
                </button>
              </div>
            </div>
          </div>

          {officers.map((officer) => (
            <div
              key={officer._id}
              className={`issue-card ${expandedOfficer === officer._id ? "expanded" : ""}`}
            >
              <div className="issue-header" onClick={() => handleView(officer._id)}>
                <div className="issue-header-left">
                  <h3>{officer.name}</h3>
                  <span className="issue-category">{officer.department || officer.role}</span>
                </div>
                <div className="issue-header-right">
                  <span className="officer-status-badge assigned">Active</span>
                  <span className="expand-icon">{expandedOfficer === officer._id ? "−" : "+"}</span>
                </div>
              </div>

              <div className={`issue-details ${expandedOfficer === officer._id ? "open" : ""}`}>
                {selectedOfficer?._id === officer._id && (
                  <>
                    <div className="detail-grid">
                      <div className="detail-item">
                        <label><FiUser /> Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={formErrors.name ? "input-error" : ""}
                        />
                        {formErrors.name && <span className="field-error">{formErrors.name}</span>}
                      </div>

                      <div className="detail-item">
                        <label><FiMail /> Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={formErrors.email ? "input-error" : ""}
                        />
                        {formErrors.email && <span className="field-error">{formErrors.email}</span>}
                      </div>

                      <div className="detail-item">
                        <label><FiLock /> Password</label>
                        <input
                          type="password"
                          name="password"
                          placeholder="Leave blank to keep current"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="detail-item">
                        <label><FiMapPin /> Department</label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="detail-item">
                        <label><FiMapPin /> Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="detail-item">
                        <label><FiPhone /> Phone</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="detail-item">
                        <label>Joined</label>
                        <span>{new Date(selectedOfficer.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="detail-item">
                        <label>Officer ID</label>
                        <span className="mono">{selectedOfficer._id}</span>
                      </div>
                    </div>

                    <div className="issue-actions">
                      <button className="officer-btn btn-primary" onClick={handleUpdate} disabled={updating}>
                        {updating ? <ButtonLoader text="Updating..." /> : "Update"}
                      </button>
                      <button className="officer-btn btn-danger" onClick={handleDelete} disabled={deleting}>
                        {deleting ? <ButtonLoader text="Deleting..." /> : "Delete"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OfficerManagement;