import React from "react";
import StatCard from "../dashboard/StatCard"
import {
    HiOutlineDocumentText,
    HiOutlineClock,
    HiOutlineArrowPath,
    HiOutlineCheckCircle
} from "react-icons/hi2";
function StatsGrid(props) {
    const totalReports = props.issues.length;
    const pendingReports = props.issues.filter(
        issue => issue.status === "Pending").length;
    const inProgressReports = props.issues.filter(
        issue => issue.status === "In Progress").length;
    const resolvedReports = props.issues.filter(
        issue => issue.status === "Resolved").length;

    return (
        <div className="stats-grid">
            <StatCard
                title="Total Reports"
                count={totalReports} 
                icon={<HiOutlineDocumentText />}/>
            <StatCard
                title="Pending"
                count={pendingReports} 
                 icon={<HiOutlineClock />}/>
            <StatCard
                title="In Progress"
                count={inProgressReports}
                 icon={<HiOutlineArrowPath />} />
            <StatCard
                title="Resolved"
                count={resolvedReports}
                 icon={<HiOutlineCheckCircle />}
            /> 
        </div>
    )
}

export default StatsGrid;