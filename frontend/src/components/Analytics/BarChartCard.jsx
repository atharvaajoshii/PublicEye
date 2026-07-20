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

import { CHART_COLORS } from "../../constants/chartColors";

function BarChartCard({
  title,
  data,
  dataKey,
  XKey,
  compact = false,
}) {
  return (
    <div className="chart-card">

      <h3 className="chart-title">{title}</h3>

      <div className="chart-body area-chart-body">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#EEE6D8"
              horizontal={false}
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#5C5568",
                fontSize: 12,
              }}
            />

            <YAxis
              type="category"
              dataKey={XKey}
              width={90}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#5C5568",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: "#F8F2FF",
              }}
              contentStyle={{
                background: "#FFFDF8",
                border: "1px solid #E8DFC9",
                borderRadius: "16px",
                boxShadow:
                  "0 8px 25px rgba(43,26,63,.12)",
              }}
            />

            <Bar
              dataKey={dataKey}
              radius={[0,6,6,0]}
              animationDuration={1400}
              animationBegin={200}
              animationEasing="ease-in-out"
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    CHART_COLORS[
                      index % CHART_COLORS.length
                    ]
                  }
                />

              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default BarChartCard;