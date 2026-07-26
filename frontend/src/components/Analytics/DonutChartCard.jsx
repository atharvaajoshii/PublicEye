import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import { FiPieChart } from "react-icons/fi";

import { CHART_COLORS } from "../../constants/chartColors";

function DonutTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0];

  return (
    <div className="analytics-tooltip">
      <div className="analytics-tooltip-row">
        <span className="analytics-tooltip-dot" style={{ background: entry.color || entry.payload?.fill }} />
        <span className="analytics-tooltip-label">{entry.name}</span>
      </div>
      <p className="analytics-tooltip-value">{entry.value}</p>
    </div>
  );
}

function DonutChartCard({ title, data = [], dataKey, nameKey, compact = false, span }) {
  const total = data.reduce((sum, item) => sum + Number(item[dataKey]), 0);

  return (
    <div className={`chart-card ${span ? `span-${span}` : ""}`}>
      <h3 className="chart-title">{title}</h3>

      <div className="donut-layout">
        <div className={`chart-body ${compact ? "compact" : ""} donut-wrapper`}>
          {data.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <FiPieChart size={22} />
              </div>
              <p>No data for this range</p>
              <span>Try widening the date filter above</span>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey={dataKey}
                    nameKey={nameKey}
                    cx="50%"
                    cy="50%"
                    innerRadius="58%"
                    outerRadius="88%"
                    paddingAngle={3}
                    cornerRadius={6}
                    animationDuration={1200}
                    animationBegin={100}
                    animationEasing="ease-in-out"
                  >
                    {data.map((entry, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="var(--surface)" strokeWidth={2} />
                    ))}
                  </Pie>

                  <Tooltip content={<DonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="donut-center">
                <span>Total</span>
                <h2>{total}</h2>
              </div>
            </>
          )}
        </div>

        {data.length > 0 && (
          <div className="custom-legend">
            {data.map((item, index) => (
              <div key={index} className="legend-item">
                <span
                  className="legend-color"
                  style={{ background: CHART_COLORS[index % CHART_COLORS.length] }}
                />
                <span className="legend-text">{item[nameKey]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DonutChartCard;