// Atmika
import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import officerService from "../services/officerService";
import "../styles/aakanksha.css"; 

function OfficerDashboard() {

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalIssues: 0,
    assigned: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0
  });

  const [priorityIssues, setPriorityIssues] = useState([]);
  const [recentAssigned, setRecentAssigned] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (user) fetchDashboard();
  }, [user]);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await officerService.getDashboard();

      setStats(res.data.stats);
      setPriorityIssues(res.data.priorityIssues);
      setRecentAssigned(res.data.recentAssigned);
      setRecentActivity(res.data.recentActivity);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="officer-loading">Loading Dashboard Space...</div>;
  }

  return (
    <div className="officer-dashboard-container">
      <h1 className="officer-dashboard-main-title">Officer Workspace</h1>

      {/* Stats Summary Grid */}
      <div className="officer-stats-grid">
        <div className="officer-stat-card card-total">
          <h1>Total Assigned</h1>
          <p>{stats.totalIssues}</p>
        </div>
        <div className="officer-stat-card card-assigned">
          <h1>Assigned</h1>
          <p>{stats.assigned}</p>
        </div>
        <div className="officer-stat-card card-inprogress">
          <h1>In Progress</h1>
          <p>{stats.inProgress}</p>
        </div>
        <div className="officer-stat-card card-resolved">
          <h1>Resolved</h1>
          <p>{stats.resolved}</p>
        </div>
        <div className="officer-stat-card card-rejected">
          <h1>Rejected</h1>
          <p>{stats.rejected}</p>
        </div>
      </div>

      {/* Dashboard Panels */}
      <div className="officer-content-layout">
        
        {/* Priority Issues */}
        <div className="officer-section-panel">
          <h1 className="officer-panel-heading">Priority Issues</h1>
          <div className="officer-panel-list">
            {priorityIssues.map((issue) => (
              <div 
                key={issue._id}
                className="officer-static-item-card"
              >
                <h3>{issue.issue?.title || "Untitled Issue"}</h3>
                <p className="meta-text">Votes: <strong>{issue.issue?.votes}</strong></p>
                <p className="meta-text">Progress: {issue.progress}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Assigned */}
        <div className="officer-section-panel">
          <h1 className="officer-panel-heading">Recently Assigned</h1>
          <div className="officer-panel-list">
            {recentAssigned.map((issue) => (
              <div 
                key={issue._id}
                className="officer-static-item-card"
              >
                <h3>{issue.issue?.title || "Untitled Issue"}</h3>
                <p className="meta-text">
                  {issue.createdAt
                    ? new Date(issue.createdAt).toLocaleString()
                    : "No date available"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="officer-section-panel">
          <h1 className="officer-panel-heading">Recent Activity</h1>
          <div className="officer-panel-list">
            {recentActivity.map((activity) => (
              <div 
                key={activity._id}
                className="officer-static-item-card activity-card"
              >
                <h3>{activity.issue?.title || "Untitled Issue"}</h3>
                <p className="meta-text">Status: <span className="status-pill">{activity.issue?.status}</span></p>
                <p className="meta-text">Progress: {activity.progress}%</p>
                <p className="timestamp-text">
                  {activity.updatedAt
                    ? new Date(activity.updatedAt).toLocaleString()
                    : "No date available"}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default OfficerDashboard;