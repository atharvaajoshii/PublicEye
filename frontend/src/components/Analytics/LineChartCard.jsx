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
import { FiTrendingUp } from "react-icons/fi";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="analytics-tooltip">
      <p className="analytics-tooltip-label">{label}</p>
      {payload.map((entry, i) => (
        <div className="analytics-tooltip-row" key={i}>
          <span className="analytics-tooltip-dot" style={{ background: "var(--primary)" }} />
          <span className="analytics-tooltip-value">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function LineChartCard({ title, data = [], dataKey, XKey, compact = false, span }) {
  return (
    <div className={`chart-card ${span ? `span-${span}` : ""}`}>
      <h3 className="chart-title">{title}</h3>

      <div className={`chart-body ${compact ? "compact" : ""}`}>
        {data.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FiTrendingUp size={22} />
            </div>
            <p>No trend to show</p>
            <span>Resolved issues will chart here over time</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border-alt)" vertical={false} />

              <XAxis
                dataKey={XKey}
                tick={{ fill: "var(--text-muted)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "var(--text-muted)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ stroke: "var(--primary)", strokeDasharray: "3 3" }}
                content={<ChartTooltip />}
              />

              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="var(--primary)"
                strokeWidth={3}
                animationDuration={1400}
                animationBegin={200}
                animationEasing="ease-in-out"
                dot={{ r: 4, fill: "var(--primary)", stroke: "var(--surface)", strokeWidth: 2 }}
                activeDot={{ r: 7, fill: "var(--primary)", stroke: "var(--surface)", strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default LineChartCard;