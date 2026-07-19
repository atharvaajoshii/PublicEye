// Atmika

import React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
} from "recharts";

import { CHART_COLORS } from "../constants/chartColors";

function AnalyticsChart({ type, title, data, height = 320, compact = false, dataKey, nameKey, XKey }) {
  switch (type) {
    case "pie":
      return (
        <div className="chart-card">
          <h3>{title}</h3>
          <ResponsiveContainer
            width="100%"
            height={compact?220:height}
            className="chart-body"
          >
            <PieChart>
              <Pie
                data={data}
                dataKey={dataKey}
                nameKey={nameKey}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
                cornerRadius={8}
                animationDuration={1200}
                isAnimationActive
                animationBegin={100}
                activeShape
                animationEasing="ease-in-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    case "line":
      return (
        <div className="chart-card">
          <h3>{title}</h3>
          <ResponsiveContainer
            width="100%"
            height={compact?220:height}
            className="chart-body"
          >
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey={dataKey}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
                animationDuration={1400}
                animationEasing="ease-in-out"
              />
              <XAxis dataKey={XKey} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    case "bar":
      return (
        <div className="chart-card">
          <h3>{title}</h3>
          <ResponsiveContainer
            width="100%"
            height={compact?220:height}
            className="chart-body"
          >
            <BarChart data={data}>
              <Bar dataKey={dataKey} layout="vertical" animationBegin={200} />
              <XAxis dataKey={XKey} />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    default:
      return null;
  }
}

export default AnalyticsChart;
