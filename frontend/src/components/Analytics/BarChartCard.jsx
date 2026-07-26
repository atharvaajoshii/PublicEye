import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { FiBarChart2 } from "react-icons/fi";

import { CHART_COLORS } from "../../constants/chartColors";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="analytics-tooltip">
      <p className="analytics-tooltip-label">{label}</p>
      {payload.map((entry, i) => (
        <div className="analytics-tooltip-row" key={i}>
          <span
            className="analytics-tooltip-dot"
            style={{ background: entry.color || entry.fill }}
          />
          <span className="analytics-tooltip-value">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function BarChartCard({ title, data = [], dataKey, XKey, compact = false, span }) {
  return (
    <div className={`chart-card ${span ? `span-${span}` : ""}`}>
      <h3 className="chart-title">{title}</h3>

      <div className={`chart-body area-chart-body ${compact ? "compact" : ""}`}>
        {data.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FiBarChart2 size={22} />
            </div>
            <p>No data for this range</p>
            <span>Try widening the date filter above</span>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 24, left: 20, bottom: 10 }}
              barCategoryGap={14}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border-alt)" horizontal={false} />

              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              />

              <YAxis
                type="category"
                dataKey={XKey}
                width={96}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--text-muted)", fontSize: 12 }}
              />

              <Tooltip cursor={{ fill: "var(--hover-light)" }} content={<ChartTooltip />} />

              <Bar
                dataKey={dataKey}
                radius={[0, 10, 10, 0]}
                maxBarSize={26}
                animationDuration={1400}
                animationBegin={200}
                animationEasing="ease-in-out"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default BarChartCard;