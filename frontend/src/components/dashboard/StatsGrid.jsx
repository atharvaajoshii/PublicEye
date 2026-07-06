import React from "react";
import StatCard from "../dashboard/StatCard"
function StatsGrid(props) {
    const totalReports = props.issues.length;
    const pendingReports = props.issues.filter(
        issue => issue.status === "Pending").length;
    const inProgressReports = props.issues.filter(
        issue => issue.status === "In Progress").length;
    const resolvedReports = props.issues.filter(
        issue => issue.status === "Resolved").length;

    return (
        <div>
            <StatCard
                title="Total Reports"
                count={totalReports} />
            <StatCard
                title="Pending"
                count={pendingReports} />
            <StatCard
                title="In Progress"
                count={inProgressReports} />
            <StatCard
                title="Resolved"
                count={resolvedReports} />
        </div>
    )
}

export default StatsGrid;