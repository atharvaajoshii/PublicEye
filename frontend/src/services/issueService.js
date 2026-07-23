import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/issues`;


const getUserIssues = async (params) => {
    const response = await axios.get(`${API}`, { params, withCredentials: true })
    return response.data;
}

const getAllIssues = async () => {
    const response = await axios.get(`${API}/all`, {
        withCredentials: true
    });

    return response.data;
}
const voteIssue = async(issueId) =>{
    const response = await axios.post(
        `${API}/${issueId}/vote`,
        {},
        {
            withCredentials:true
        }
    );
    return response.data;
}
export default {
    getUserIssues,  
    getAllIssues,
    voteIssue
};