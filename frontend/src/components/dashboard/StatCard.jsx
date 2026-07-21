import React from "react";
function StatCard(props) {
    return (
        <div className="StatCard">
            <div className="stat-icon">
                {props.icon}
            </div>
            <p>{props.title}</p>
            <h3>{props.count}</h3>
        </div>
    )
}

export default StatCard;