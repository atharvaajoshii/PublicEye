import React from "react";
import {ResponsiveContainer,
        PieChart,
        Pie,
        Cell,
        Tooltip,
        Legend
    }from "recharts";
function StatusChart(props){
    const pending = props.issues.filter(
        issue => issue.status === "Pending").length;
    const inProgress = props.issues.filter(
        issue => issue.status === "In Progress").length;
    const resolved = props.issues.filter(
        issue => issue.status === "Resolved").length;
    const data = [
        {
            name:"Pending",
            value:pending
        },
        {
            name:"In Progress",
            value:inProgress
        },
        {
            name:"Resolved",
            value:resolved
        }
    ]
        return(
        <div style={{ width: "100%" , height:300}} className="StatCard" > {/* why do we use double bracket here */}
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        label>
                            {data.map((entry, index) => (
                    <Cell
                        key={index}
                        fill={[
                            "#482D58",
                            "#7B57CE",
                            "#8F9D68"
                        ][index]}
                    />
                ))} {/* the data.map and cell part is generated  */}
                        </Pie>
                <Tooltip />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )   
}

export default StatusChart;