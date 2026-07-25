import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

import { CHART_COLORS } from "../../constants/chartColors";

function DonutChartCard({
  title,
  data = [],
  dataKey,
  nameKey,
  compact = false,
}) {
  const total = data.reduce(
    (sum, item) => sum + Number(item[dataKey]),
    0
  );

  return (
    <div className="chart-card">
      <h3 className="chart-title">{title}</h3>

      <div className="donut-layout">
        <div
          className={`chart-body ${compact ? "compact" : ""} donut-wrapper`}
        >
          {data.length === 0 ? (
            <div className="empty-chart">
              No resolved issues
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
                    innerRadius="55%"
                    outerRadius="85%"
                    paddingAngle={2}
                    cornerRadius={3}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="donut-center">
                <span>Total</span>
                <h2>{total}</h2>
              </div>
            </>
          )}
        </div>

        <div className="custom-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <span
                className="legend-color"
                style={{
                  background:
                    CHART_COLORS[index % CHART_COLORS.length],
                }}
              />
              <span className="legend-text">{item[nameKey]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DonutChartCard;