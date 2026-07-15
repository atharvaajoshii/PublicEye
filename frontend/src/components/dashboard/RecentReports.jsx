import React from "react";

function RecentReports(props){
   props.issues.map((issue) => {
        console.log(issue)//just for learning purpuse tos ee if it works let it be here to understand the code 
   })
    return(
        <div className="StatCard">
            {props.issues.map((issue) =>(
                <div key={issue._id}>
                    <h3>{issue.title}</h3>
                    <p>{issue.status}</p>
                </div>
            ))}
        </div>
    )
}
export default RecentReports;