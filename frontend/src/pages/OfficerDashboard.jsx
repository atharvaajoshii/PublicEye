// Atmika

import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

function OfficerDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalIssues: 0,
    assigned: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0
  })

  const [priorityIssues, setPriorityIssues] = useState([]);
  const [recentAssigned, setRecentAssigned] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, [])

  const fetchDashboard = async () => {
    try {
      const officerId = "6a39f9d694f116839d769180";

      const res = await axios.get(
        `http://localhost:5000/api/officer/dashboard/${officerId}`
      );
      setStats(res.data.stats);
      setPriorityIssues(res.data.priorityIssues);
      setRecentAssigned(res.data.recentAssigned);
      setRecentActivity(res.data.recentActivity);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <Link to='/officer/manage-issues'>Manage Issues</Link>
        <Link to='/officer/map'>Map</Link>
        <Link to='/officer/analytics'>Analytics</Link>
      </div>
      <div>
        <div>
          <h1>Total Assigned</h1>
          <p>{stats.totalIssues}</p>
        </div>
        <div>
          <h1>Assigned</h1>
          <p>{stats.assigned}</p>
        </div>
        <div>
          <h1>In Progress</h1>
          <p>{stats.inProgress}</p>
        </div>
        <div>
          <h1>Resolved</h1>
          <p>{stats.resolved}</p>
        </div>
        <div>
          <h1>Rejected</h1>
          <p>{stats.rejected}</p>
        </div>
      </div>
      <div>
        <div>
          <h1>Priority Isssues</h1>
          {priorityIssues.map((issue) => (
            <div key={issue._id}
            onClick={() => navigate(`/issue/${issue.issue._id}`)}
      style={{ cursor: "pointer" }}>
              <h3>{issue.issue?.title}</h3>
              <p>Votes: {issue.issue?.votes}</p>
              <p>Progress: {issue.progress}</p>
            </div>
          ))}
        </div>
        <div>
          <h1>Recently Assigned Isssues</h1>
          {recentAssigned.map((issue) => (
            <div key={issue._id} 
            onClick={() => navigate(`/issue/${issue.issue._id}`)}
            style={{ cursor: "pointer" }}>
              <h3>{issue.issue?.title}</h3>
              <p>{issue.createdAt
                ? new Date(issue.createdAt).toLocaleString()
                : "No date available"}</p>
            </div>
          ))}
        </div>
        <div>
          <h1>Recent Activity</h1>
          {recentActivity.map((activity) => (
            <div key={activity._id}
            onClick={() => navigate(`/issue/${activity.issue._id}`)}
      style={{ cursor: "pointer" }}>
              <p>{activity.issue?.title}</p>
              <p>Status: {activity.Status}</p>
              <p>Progress: {activity.progress}</p>
              <p>{activity.updatedAt
                ? new Date(activity.updatedAt).toLocaleString()
                : "No date available"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OfficerDashboard