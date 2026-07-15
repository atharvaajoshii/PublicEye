import React from "react"; 
function StatCard(props){
    return(
        <div className="StatCard">
            <h2>{props.title}</h2>
             <h3>{props.count}</h3>
        </div>
    )   
}

export default StatCard;