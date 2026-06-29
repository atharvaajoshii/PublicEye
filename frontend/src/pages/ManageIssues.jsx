// Atmika

import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

function ManageIssues() {

    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        fetchIssues();
    }, [search, status, category, sort])

    const fetchIssues = async () => {
        try {
            const officerId = "6a39f9d694f116839d769180";

            const res = await axios.get(
                `http://localhost:5000/api/officer/manage-issues/${officerId}`, { params: { search, status, category, sort } }
            );
            setIssues(res.data.issues);

        } catch (error) {
            console.log(error);
        }
    }

    const handleStatusChange = async (issueId, newStatus) => {
        try {
            await axios.patch(
                `http://localhost:5000/api/officer/manage-issues/${issueId}/status`,
                { status: newStatus }
            );

            fetchIssues();
        } catch (error) {
            console.log(error);
        }
    }

    return (
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
                {issues.filter(item => item.issue).map((issue) => (
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
                            <p>Assigned date : {" "}{new Date(issue.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManageIssues;