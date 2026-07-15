// import Navbar from "../components/Navbar";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import StatusChart from "../components/dashboard/StatusChart";
 import StatusGrid from "../components/dashboard/StatsGrid";
 import ReportsChart from "../components/dashboard/ReportsChart";
import RecentReports from "../components/dashboard/RecentReports";
import { useState, useEffect } from "react";
import userService from "../services/userService";
import issueService from "../services/issueService";
import React from "react";
import "../styles/dashboard.css" ;
function Dashboard() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUser = async () => {
            const data = await userService.getProfile();
            setUser(data);
        };// we create the fucntion that will fetchUser
        fetchUser();
    }, []);
    const [issues,setIssues] = useState([]);
    useEffect(() => {
        const fetchIssues = async () => {
            const data = await issueService.getUserIssues();
            setIssues(data.userIssues);
        };
        fetchIssues();
    },[]);
    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-content">
                <WelcomeSection user = {user}/>
                <StatusGrid issues={issues} />
                <div className="chart-row">
                    <RecentReports issues = {issues}/>
                    <StatusChart issues ={issues}/>
                </div>
                <ReportsChart />
            </main>
        </div>
    );
}

export default Dashboard;