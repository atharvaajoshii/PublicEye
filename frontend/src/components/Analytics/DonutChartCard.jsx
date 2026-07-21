import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

import { CHART_COLORS } from "../../constants/chartColors";

function DonutChartCard({ title, data, dataKey, nameKey, compact = false }) {
  const total = data.reduce((sum, item) => sum + Number(item[dataKey]), 0);
  const isMobile = window.innerWidth < 768;

  return (
    <div className="chart-card">
      <h3 className="chart-title">{title}</h3>

      <div className="donut-layout">
        <div className="donut-chart">
          <div
            className={`chart-body ${compact ? "compact" : ""} donut-wrapper`}
          >
            <ResponsiveContainer width="100%" height="100%" >
              <PieChart>
                <Pie
                  data={data}
                  dataKey={dataKey}
                  nameKey={nameKey}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  paddingAngle={2}
                  cornerRadius={3}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={CHART_COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="donut-center">
              <span>Total</span>

              <h2>{total}</h2>
            </div>
            <div className="custom-legend">
              {data.map((item, index) => (
                <div key={index} className="legend-item">
                  <span
                    className="legend-color"
                    style={{
                      background: CHART_COLORS[index],
                    }}
                  />

                  {item[nameKey]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonutChartCard;
