import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FiActivity } from "react-icons/fi";

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

function AreaChartCard({ title, data = [], dataKey, XKey, compact = false, span }) {
  return (
    <div className={`chart-card ${span ? `span-${span}` : ""}`}>
      <h3 className="chart-title">{title}</h3>

      <div className={`chart-body area-chart-body ${compact ? "compact" : ""}`}>
        {data.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FiActivity size={22} />
            </div>
            <p>No reports for this range</p>
            <span>Try widening the date filter above</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 16, right: 24, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>

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

              <Tooltip cursor={{ stroke: "var(--primary)", strokeDasharray: "3 3" }} content={<ChartTooltip />} />

              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="var(--primary)"
                strokeWidth={3}
                fill="url(#areaFill)"
                animationDuration={1400}
                animationBegin={200}
                animationEasing="ease-in-out"
                dot={{ r: 3.5, fill: "var(--primary)", stroke: "var(--surface)", strokeWidth: 2 }}
                activeDot={{ r: 7, fill: "var(--primary)", stroke: "var(--surface)", strokeWidth: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default AreaChartCard;