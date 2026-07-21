import React, { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";


function MetricCard({
    title,
    value,
    unit = "",
    icon,
    color = "var(--primary)"
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

        },16);

        return () => clearInterval(timer);

    },[value]);

    return (

        <div className="metric-card">

            <div
                className="metric-icon"
                style={{background:color}}
            >
                {icon}
            </div>

            <div className="metric-content">
    <p className="metric-title">
        {title}
    </p>

    {Number(value) === 0 ? (
        <div className="empty-chart">
            No resolved issues
        </div>
    ) : (
        <h2 className="metric-value">
            {displayValue}
            <span>{unit}</span>
        </h2>
    )}
</div>
        </div>

    );

}

export default MetricCard;