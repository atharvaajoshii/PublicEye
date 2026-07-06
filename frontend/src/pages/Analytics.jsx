// Atmika

import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import AnalyticsChart from "../components/AnalyticsChart"
import officerService from "../services/officerService";

import { GoChevronLeft } from "react-icons/go";

function Analytics() {
    const navigate = useNavigate();

    const [analytics, setAnalytics] = useState({
        category: [],
        monthly: [],
        resolution: [],
        area: [],
        status: [],
        avgTime: {
            averageDays: 0
        },
        topVotes: []
    });

    useEffect(() => {
        fetchAnalytics();
    }, [])

    const fetchAnalytics = async () => {
        try {
            const res = await officerService.getAnalytics();

            setAnalytics(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>
            <GoChevronLeft />Back
            </button>
            <h1>Analytics</h1>
            <div>
                <h1>Average Resolution Time</h1>
                <p>{analytics.avgTime.averageDays} days</p>
            </div>
            <div>
                <AnalyticsChart
                    type="pie"
                    title="Category Distribution"
                    data={analytics.category}
                    dataKey="count"
                    nameKey="category"
                />
                <AnalyticsChart
                    type="line"
                    title="Monthly Reports"
                    data={analytics.monthly}
                    dataKey="issues"
                    XKey="month"
                />
                <AnalyticsChart
                    type="bar"
                    title="Area Distribution"
                    data={analytics.area}
                    dataKey="issues"
                    XKey="area"
                />
                <AnalyticsChart
                    type="line"
                    title="Resolution Trend"
                    data={analytics.resolution}
                    dataKey="resolved"
                    XKey="month"
                />
                <AnalyticsChart
                    type="bar"
                    title="Status Distribution"
                    data={analytics.status}
                    dataKey="issues"
                    XKey="status"
                />
            </div>
            <div>
                <h1>Top Voted Issues</h1>
                {analytics.topVotes.map((issue) => (
                    <div key={issue._id}
                        onClick={() => navigate(`/issue/${issue._id}`)}
                        style={{ cursor: "pointer" }}>
                        <h3>{issue.title}</h3>
                        <p>Votes: {issue.votes}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Analytics