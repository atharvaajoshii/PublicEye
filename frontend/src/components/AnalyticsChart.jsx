// Atmika

import React from "react";
import {
    ResponsiveContainer, Tooltip, Legend,
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    PieChart, Pie,
    BarChart, Bar
} from "recharts";
import { Link, useNavigate } from "react-router-dom"

function AnalyticsChart({ type, title, data, dataKey, nameKey, XKey }) {
    switch (type){
        case "pie" :
        return (
            <div className="chart-card">
            <h3>{title}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey={dataKey}
                        nameKey={nameKey}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                    />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            </div>
        );
    case "line" :
        return (
            <div className="chart-card">
            <h3>{title}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <Line type="monotone" dataKey={dataKey} />
                    <XAxis dataKey={XKey} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
            </div>
        )
        case "bar" :
        return (
            <div className="chart-card">
            <h3>{title}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <Bar dataKey={dataKey} />
                    <XAxis dataKey={XKey} />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                </BarChart>
            </ResponsiveContainer>
            </div>
        )
    default : return null;
    }
}

export default AnalyticsChart;
