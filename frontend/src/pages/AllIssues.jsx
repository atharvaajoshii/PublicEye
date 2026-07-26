import React, { useEffect, useState } from "react";
import axios from "axios";
import IssueCard from "../components/IssueCard";
import "../styles/adithya_css/all_issues.css";

function AllIssues() {
  const [issues, setIssues] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [voting, setVoting] = useState("");
  let filteredIssues = [...issues];
  if (search) {
    filteredIssues = filteredIssues.filter(issue =>
      issue.title?.toLowerCase().includes(search.toLowerCase()) ||
      issue.location?.toLowerCase().includes(search.toLowerCase()) ||
      issue.description?.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (status) {
    filteredIssues = filteredIssues.filter(
      issue => issue.status === status
    );
  }
  if (category) {
    filteredIssues = filteredIssues.filter(
      issue => issue.category === category
    );
  }
  if (voting === "enabled") {
    filteredIssues = filteredIssues.filter(issue => issue.publicVoting);
  }
  if (voting === "disabled") {
    filteredIssues = filteredIssues.filter(issue => !issue.publicVoting);
  }
  if (sort === "newest") {
    filteredIssues.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  if (sort === "oldest") {
    filteredIssues.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }
  if (sort === "votes") {
    filteredIssues.sort((a, b) => b.votes - a.votes);
  }
  if (sort === "priority") {
    filteredIssues.sort((a, b) => b.priority - a.priority);
  }
  useEffect(() => {
  setExpandedRow(null);
}, [search, status, category, sort, voting]);
 
useEffect(() => {
    const fetchAllIssues = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/issues/all`,
          {
            withCredentials: true,
          },
        );
        setIssues(res.data.issues || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllIssues();
  }, []);

  // Toggle logic: If clicked again, close it. Otherwise, open it.
  const handleToggleExpand = (rowIndex) => {
    setExpandedRow((prev) => (prev === rowIndex ? null : rowIndex));
  };

  const rows = [];

  for (let i = 0; i < filteredIssues.length; i += 3) {
    rows.push(filteredIssues.slice(i, i + 3));
  }

  return (
    <div className="dashboard-layout">
      <main className="dashboard-content">
        <div className="page-header">
          <h1>All Issues</h1>
          <p>Browse and track reported civic issues.</p>
        </div>
        <div className="officer-filters-toolbar">
          <input
            type="search"
            className="officer-input-search"
            placeholder="Search Issues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="officer-select-filter"
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
            <option value="">Sort By</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="votes">Most Supported</option>
          </select>

          <select
            className="officer-select-filter"
            value={voting}
            onChange={(e) => setVoting(e.target.value)}
          >
            <option value="">All Issues</option>
            <option value="enabled">Voting Enabled</option>
            <option value="disabled">Voting Disabled</option>
          </select>
        </div>
        <div className="issues-container">
          {rows.map((row, rowIndex) => (
            <div className="issue-row" key={rowIndex}>
              {row.map((issue) => (
                <IssueCard
                  key={issue._id}
                  issue={issue}
                  rowExpanded={expandedRow === rowIndex}
                  onToggle={() => handleToggleExpand(rowIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AllIssues;
