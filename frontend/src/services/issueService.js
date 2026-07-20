import axios from "axios";

const API = "http://localhost:5000/api/issues";


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

export default {
    getUserIssues,  
    getAllIssues
};