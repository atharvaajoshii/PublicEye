import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function LineChartCard({
  title,
  data = [],
  dataKey,
  XKey,
  compact = false,
}) {
  return (
    <div className="chart-card">
      <h3 className="chart-title">{title}</h3>

      <div className={`chart-body ${compact ? "compact" : ""}`}>
        {data.length === 0 ? (
          <div className="empty-chart">
            No resolved issues
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#EEE6D8"
                vertical={false}
              />

              <XAxis
                dataKey={XKey}
                tick={{ fill: "#5C5568", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#5C5568", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  stroke: "#7B57CE",
                  strokeDasharray: "3 3",
                }}
                contentStyle={{
                  background: "#FFFDF8",
                  border: "1px solid #E8DFC9",
                  borderRadius: "16px",
                  boxShadow: "0 8px 25px rgba(43,26,63,.12)",
                }}
              />

              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#7B57CE"
                strokeWidth={3}
                animationDuration={1400}
                animationBegin={200}
                animationEasing="ease-in-out"
                dot={{
                  r: 4,
                  fill: "#7B57CE",
                  stroke: "#FFFDF8",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 7,
                  fill: "#7B57CE",
                  stroke: "#FFFDF8",
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default LineChartCard;
