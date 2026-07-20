// Atmika

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import officerService from "../services/officerService";
import IssueImage from "../components/IssueImage";

import "../styles/atharva.css";

function ManageIssues() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [expandedIssue, setExpandedIssue] = useState(null);
  const [selectedIssueDetails, setSelectedIssueDetails] = useState(null);

  const [progressValues, setProgressValues] = useState({});

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

  const fetchIssues = async () => {
    try {
      const res = await officerService.getManageIssues({
        search,
        status,
        category,
        sort,
      });
      setIssues(res.data.issues || []);
    } catch (error) {
      console.log("Error fetching issues:", error);
    }
  };

  useEffect(() => {
    const values = {};

    issues.forEach((item) => {
      if (item.issue) {
        values[item.issue._id] = item.progress || 0;
      }
    });

    setProgressValues(values);
  }, [issues]);

  useEffect(() => {
    if (user) fetchIssues();
  }, [user, search, status, category, sort]);

  const handleToggleDetails = async (e, issueId, rawItemData) => {
    e.stopPropagation();

    if (expandedIssue === issueId) {
      setExpandedIssue(null);
      setSelectedIssueDetails(null);
      return;
    }

    setExpandedIssue(issueId);
    setSelectedIssueDetails(rawItemData);
  };

  const handleStatusChange = async (issueId, newStatus) => {
    try {
      await officerService.updateStatus(issueId, newStatus);
      await fetchIssues();
      let progress;

      if (newStatus === "Pending") {
        progress = 0;
      } else if (newStatus === "Assigned") {
        progress = 15;
      } else if (newStatus === "Resolved") {
        progress = 100;
      } else if (newStatus === "Rejected") {
        progress = 0;
      } else {
        // In Progress -> keep the current value
        progress = progressValues[issueId] ?? 15;
      }

      setProgressValues((prev) => ({
        ...prev,
        [issueId]: progress,
      }));
      fetchIssues();
      if (expandedIssue === issueId) {
        setSelectedIssueDetails((prev) => ({
          ...prev,
          issue: { ...prev.issue, status: newStatus },
        }));
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  const handleProgressChange = async (issueId, newProgress) => {
    if (newProgress < 0 || newProgress > 100) return;

    try {
      await officerService.updateProgress(issueId, newProgress);
      fetchIssues();
    } catch (error) {
      console.log(error);
    }
  };

  const handleVotingChange = async (issueId, value) => {
    try {
      await officerService.updateVoting(issueId, value);
      fetchIssues();   // refresh the list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="officer-dashboard-container">
      <div>
        <h1 className="officer-dashboard-main-title">
          Manage Workspace Issues
        </h1>

        {/* Filters Toolbar */}
        <div className="officer-filters-toolbar">
          <input
            type="search"
            className="officer-input-search"
            placeholder="Search Issue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="officer-select-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            className="officer-select-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Road">Road</option>
            <option value="Garbage">Garbage</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Street Light">Street Light</option>
            <option value="Other">Other</option>
          </select>

          <select
            className="officer-select-filter"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By: Default</option>
            <option value="votes">Most Votes</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Issues List */}
        <div className="issue-list">
          {issues.length === 0 ? (
            <p className="officer-no-records-text">
              No matching workspace issues found.
            </p>
          ) : (
            issues.map((item) => {
              const coreIssue = item?.issue;
              const canEditProgress = coreIssue.status === "In Progress";
              if (!coreIssue) return null;

              const isExpanded = expandedIssue === coreIssue._id;

              return (
                <div
                  key={coreIssue._id}
                  className={`issue-card ${isExpanded ? "expanded" : ""}`}
                >
                  {/* Main Row Block Header */}
                  <div
                    className="issue-header"
                    onClick={(e) => handleToggleDetails(e, coreIssue._id, item)}
                  >
                    <div className="officer-card-info-side">
                      <span className="issue-category">
                        {coreIssue.category}
                      </span>
                      <h3 className="officer-card-issue-title">
                        {coreIssue.title}
                      </h3>

                      <div className="officer-card-actions-wrapper">
                        <button
                          type="button"
                          className="officer-btn btn-primary"
                          onClick={(e) =>
                            handleToggleDetails(e, coreIssue._id, item)
                          }
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                        </button>
                        <button
                          type="button"
                          className="officer-btn btn-secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/issue/${coreIssue._id}/report`);
                          }}
                        >
                          Report
                        </button>
                      </div>
                      <div className="checkbox-group">

<input
type="checkbox"
checked={coreIssue.publicVoting}
onChange={(e) =>
  handleVotingChange(coreIssue._id, e.target.checked)
}
/>
<label htmlFor="publicVoting">
  Enable Public Voting
</label>
</div>
                    </div>

                    {/* Status / Inline Modifications side */}
                    <div
                      className="officer-card-status-side"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="meta-text">
                        <strong>{coreIssue.votes || 0}</strong> Votes
                      </p>

                      <div className="officer-control-group">
                        <label className="officer-control-label">
                          STATUS UPDATE:
                        </label>
                        <select
                          className="officer-select-inline"
                          value={coreIssue.status || "Assigned"}
                          onChange={(e) =>
                            handleStatusChange(coreIssue._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Assigned">Assigned</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>

                      <div className="officer-control-group">
                        <label className="officer-control-label">
                          PROGRESS METRIC:
                        </label>
                        <div className="officer-progress-wrapper">
                          <div className="officer-progress-bar">
                            <div
                              className="officer-progress-fill"
                              style={{
                                width: `${progressValues[coreIssue._id] ?? 0}%`,
                              }}
                            />
                          </div>

                          <div className="officer-progress-controls">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              disabled={!canEditProgress}
                              value={progressValues[coreIssue._id] ?? 0}
                              onChange={(e) =>
                                setProgressValues((prev) => ({
                                  ...prev,
                                  [coreIssue._id]: Number(e.target.value),
                                }))
                              }
                              onMouseUp={() =>
                                handleProgressChange(
                                  coreIssue._id,
                                  progressValues[coreIssue._id],
                                )
                              }
                            />

                            <input
                              type="number"
                              min="0"
                              max="100"
                              disabled={!canEditProgress}
                              value={progressValues[coreIssue._id] ?? 0}
                              onChange={(e) =>
                                setProgressValues((prev) => ({
                                  ...prev,
                                  [coreIssue._id]: Number(e.target.value),
                                }))
                              }
                              onBlur={() =>
                                handleProgressChange(
                                  coreIssue._id,
                                  progressValues[coreIssue._id],
                                )
                              }
                            />

                            <span>%</span>
                          </div>
                        </div>
                      </div>

                      <p className="timestamp-text">
                        Assigned:{" "}
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("en-GB")
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Dropdown Container using your CSS transition classes */}
                  <div className={`issue-details ${isExpanded ? "open" : ""}`}>
                    {isExpanded && selectedIssueDetails && (
                      <>
                        <div className="detail-grid">
                          <div className="detail-item">
                            <label>Description</label>
                            <span>
                              {selectedIssueDetails.issue?.description ||
                                "No description provided."}
                            </span>
                          </div>

                          <div className="detail-item">
                            <label>Location</label>
                            <span>
                              {selectedIssueDetails.issue?.location ||
                                "Not specified"}
                            </span>
                          </div>
                        </div>

                        <div className="issue-image-wrapper">
                          <IssueImage issueId={coreIssue._id} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageIssues;
