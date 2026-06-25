// Atmika

import React, { useState } from 'react'

function OfficerDashboard() {

  const [stats, setStats] = useState({
    totalIssues:"",
    openIssues:"",
    inProgressIssues:"",
    completedIssues:""
  })

  const [ priorityIssues, setPriorityIssues ] = useState('');
  const [ recentlyAssignedIssues, setRecentlyAssignedIssues ] = useState('');
  const [ recentActivity, setRecentActivity ] = useState('');
  
  return (
    <div>
      <div>
        <p>Manage Issues</p>
        <p>Map</p>
        <p>Analytics</p>
      </div>
      <div>
        <div>
          <h1>Total Issues</h1>
          <p></p>
        </div>
        <div>
          <h1>Open Issues</h1>
          <p></p>
        </div>
        <div>
          <h1>In Proggress Issues</h1>
          <p></p>
        </div>
        <div>
          <h1>Completed Issues</h1>
          <p></p>
          </div>
      </div>
      <div>
        <div>
          <h1>Priority Isssues</h1>
        </div>
        <div>
          <h1>Recently Assigned Isssues</h1>
        </div>
        <div>
          <h1>Recent Activity</h1>
        </div>
      </div>
    </div>
  )
}

export default OfficerDashboard