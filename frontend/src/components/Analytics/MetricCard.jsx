import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

/**
 * MetricCard
 * Split-panel KPI card: animated counter on the left, a softly glowing
 * icon chip on the right. `trend` is optional — when the caller has a
 * real percentage to show, a micro-badge renders next to the icon.
 * Nothing is fabricated when trend is absent.
 */
function MetricCard({
  title,
  value,
  unit = "",
  icon,
  color = "var(--primary-dark-alt)",
  glow = "var(--primary-alpha-10)",
  trend, // optional number, e.g. 12 or -4
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value);

    if (end === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.round(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const hasTrend = typeof trend === "number" && !Number.isNaN(trend);
  const isPositive = hasTrend && trend >= 0;

  return (
    <div className="metric-card">
      <div className="metric-content">
        <p className="metric-title">{title}</p>

        {Number(value) === 0 ? (
          <div className="metric-empty">No data yet</div>
        ) : (
          <div className="metric-value-row">
            <h2 className="metric-value">
              {displayValue}
              <span>{unit}</span>
            </h2>

            {hasTrend && (
              <span className={`metric-trend ${isPositive ? "is-up" : "is-down"}`}>
                {isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
                {Math.abs(trend)}%
              </span>
            )}
          </div>
        )}
      </div>

      <div className="metric-icon-wrap">
        <div className="metric-icon-glow" style={{ background: glow }} />
        <div className="metric-icon" style={{ color }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default MetricCard;