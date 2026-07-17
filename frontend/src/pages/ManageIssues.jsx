// Atmika

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import officerService from "../services/officerService";
import "../styles/aakanksha.css"; 

function ManageIssues() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        if (user) fetchIssues();
    }, [user, search, status, category, sort]);

    const fetchIssues = async () => {
        try {
            const res = await officerService.getManageIssues({
                search,
                status,
                category,
                sort
            });
            setIssues(res.data.issues);
        } catch (error) {
            console.log(error);
        }
    };

    const handleStatusChange = async (issueId, newStatus) => {
        try {
            await officerService.updateStatus(issueId, newStatus);
            fetchIssues();
        } catch (error) {
            console.log(error);
        }
    };

    const handleProgressChange = async (issueId, newProgress) => {
        try {
            await officerService.updateProgress(issueId, newProgress);
            fetchIssues();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="officer-dashboard-container">
            <div>
                <h1 className="officer-dashboard-main-title">Manage Workspace Issues</h1>
                
                
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

            
                <div className="officer-issues-list-container">
                    {issues.length === 0 ? (
                        <p className="officer-no-records-text">No matching workspace issues found.</p>
                    ) : null}

                    {issues.map((issue) => (
                        <div 
                            key={issue.issue?._id}
                            className="officer-issue-row-card"
                            onClick={() => navigate(`/issue/${issue.issue?._id}`)}
                        >
                            
                            <div className="officer-card-info-side">
                                <span className="officer-category-badge">{issue.issue?.category}</span>
                                <h3 className="officer-card-issue-title">{issue.issue?.title}</h3>
                                
                                <div className="officer-card-actions-wrapper">
                                    <button 
                                        type="button"
                                        className="officer-btn btn-primary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/issue/${issue.issue?._id}`);
                                        }}
                                    >
                                        View Details
                                    </button>
                                    <button 
                                        type="button"
                                        className="officer-btn btn-secondary"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/issue/${issue.issue?._id}/report`);
                                        }}
                                    >
                                        Report
                                    </button>
                                </div>
                            </div>

                         
                            <div className="officer-card-status-side">
                                <p className="meta-text"><strong>{issue.issue?.votes}</strong> Votes</p>
                                
                                <div className="officer-control-group">
                                    <label className="officer-control-label">Status Update:</label>
                                    <select
                                        className="officer-select-inline"
                                        value={issue.issue?.status}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                issue.issue?._id,
                                                e.target.value
                                            )
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
                                    <label className="officer-control-label">Progress Metric:</label>
                                    <div className="officer-progress-input-wrapper">
                                        <input
                                            type="number"
                                            className="officer-input-number"
                                            min={0}
                                            max={100}
                                            value={issue.progress || 0}
                                            disabled={issue.issue?.status !== "In Progress"}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) =>
                                                handleProgressChange(
                                                    issue.issue?._id,
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                        <span className="officer-percentage-indicator">{issue.progress || 0}%</span>
                                    </div>
                                </div>
                                
                                <p className="timestamp-text">
                                    Assigned: {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : "N/A"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageIssues;