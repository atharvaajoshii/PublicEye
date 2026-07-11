import Sidebar from "../components/Sidebar";
import React,{useEffect,useState} from "react";
import axios from "axios";
function AllIssues(){
    const[issues,setIssues] = useState([]);
    useEffect(()=>{
        const fetchAllIssues = async () => {
            try{
                const res = await axios.get(
                    "http://localhost:5000/api/issues/all",
                    {withCredentials:true}
                );
                setIssues(res.data.issues || []);
            }
            catch(error){
            console.log(error);
        }
        }
        fetchAllIssues();
    },[]);
    return(
        <div>
            <Sidebar/>
            <h1>All Issues</h1>
            {issues.map((issue)=>(
                <div key={issue._id}>
                    <h3>{issue.title}</h3>
                    <p>{issue.category}</p>
                    <p>{issue.status}</p>
                    <p>{issue.votes}</p>
                </div>
            ))}
        </div>
    )
}
export default AllIssues;