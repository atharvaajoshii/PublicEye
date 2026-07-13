// Atmika

import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import issueService from '../services/issueService';
function ManageIssues_user() {

    // const { user } = useAuth(); not required due to userService

    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
         fetchIssues();
    }, [search, sort]);

    const fetchIssues = async () => {
        try {
            const res = await issueService.getUserIssues({
                search,
                sort
            });
            setIssues(res.userIssues);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div>
                <h1>Manage Issues</h1>
                <div>
                    <input type="search" placeholder="Search Issue" value={search} onChange={(e) => setSearch(e.target.value)}></input>

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
                        <div key={issue._id}
                            style={{ cursor: "pointer" }}>
                            <div>
                                <p>Category: {issue.category}</p>
                                <h3>{issue.title}</h3>
                                <button type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/issue/${issue._id}`);
                                    }}
                                >View Details</button>
                            </div>
                            <div>
                                <p>Votes: {issue.votes}</p>

                                <p>Status: {issue.status}</p>
                                <p>Assigned date : {" "}{new Date(issue.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageIssues_user;

