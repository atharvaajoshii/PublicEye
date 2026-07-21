import React, { useId } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AreaChartCard({
  title,
  data = [],
  dataKey,
  XKey,
  compact = false,
}) {
  const gradientId = useId();

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
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#7B57CE"
                    stopOpacity={0.85}
                  />
                  <stop
                    offset="60%"
                    stopColor="#7B57CE"
                    stopOpacity={0.30}
                  />
                  <stop
                    offset="95%"
                    stopColor="#7B57CE"
                    stopOpacity={0.03}
                  />
                </linearGradient>
              </defs>

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

              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#7B57CE"
                strokeWidth={3}
                fill={`url(#${gradientId})`}
                animationDuration={1400}
                animationBegin={200}
                animationEasing="ease-in-out"
                activeDot={{
                  r: 7,
                  fill: "#7B57CE",
                  stroke: "#FFFDF8",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default AreaChartCard;