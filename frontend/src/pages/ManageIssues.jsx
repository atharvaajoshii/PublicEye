// Atmika

import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext";
import officerService from "../services/officerService";
import OfficerSidebar from "../components/OfficerSidebar"

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

            const officerId = user?._id;

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
    }

    const handleStatusChange = async (issueId, newStatus) => {
        try {
            await officerService.updateStatus(issueId, newStatus);

            fetchIssues();
        } catch (error) {
            console.log(error);
        }
    }

    const handleProgressChange = async (issueId, newProgress) => {
        try {
            await officerService.updateProgress(issueId, newProgress);

            fetchIssues();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <OfficerSidebar></OfficerSidebar>
            <div>
                <h1>Manage Issues</h1>
                <div>
                    <input type="search" placeholder="Search Issue" value={search} onChange={(e) => setSearch(e.target.value)}></input>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                    </select>

                    <select
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
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">Default</option>
                        <option value="votes">Votes</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>
                <div>
                    {issues.map((issue) => (
                        <div key={issue.issue._id}
                            style={{ cursor: "pointer" }}>
                            <div>
                                <p>Category: {issue.issue?.category}</p>
                                <h3>{issue.issue?.title}</h3>
                                <button type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/issue/${issue.issue._id}`);
                                    }}
                                >View Details</button>
                                <button type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/issue/${issue.issue._id}`);
                                    }}
                                >Report</button>
                            </div>
                            <div>
                                <p>Votes: {issue.issue?.votes}</p>
                                
                                    <select
                                        value={issue.issue.status}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                issue.issue._id,
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
                                    <div>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    value={issue.progress}
                                    disabled={issue.issue.status !== "In Progress"}
                                    onClick={(e) => e.stopPropagation()}
                                    onTouchEnd={(e) =>
                                        handleProgressChange(
                                            issue.issue._id,
                                            Number(e.target.value)
                                        )
                                    }
                                />
                                <span>{issue.progress}%</span>
                                </div>
                                    <p>Assigned date : {" "}{new Date(issue.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageIssues;

