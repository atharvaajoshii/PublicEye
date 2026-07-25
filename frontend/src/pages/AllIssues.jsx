import React, { useEffect, useState } from "react";
import axios from "axios";
import IssueCard from "../components/IssueCard";
import "../styles/adithya_css/all_issues.css";

function AllIssues() {
  const [issues, setIssues] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchAllIssues = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/issues/all`, {
          withCredentials: true,
        });
        setIssues(res.data.issues || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllIssues();
  }, []);

  // Toggle logic: If clicked again, close it. Otherwise, open it.
  const handleToggleExpand = (rowIndex) => {
    setExpandedRow(prev => prev === rowIndex ? null : rowIndex);
};

  const rows = [];

for (let i = 0; i < issues.length; i += 3) {
    rows.push(issues.slice(i, i + 3));
}


  return (
    <div className="dashboard-layout">
  <main className="dashboard-content">
    <div className="page-header">
      <h1>All Issues</h1>
      <p>Browse and track reported civic issues.</p>
    </div>

    <div className="issues-container">

    {rows.map((row, rowIndex) => (

        <div className="issue-row" key={rowIndex}>

            {row.map(issue => (

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
