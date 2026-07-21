// Atmika

import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/officer`;

const getDashboard = () => axios.get(`${API}/dashboard`, { withCredentials: true });
const getAnalytics = () => axios.get(`${API}/analytics`, { withCredentials: true });
const getManageIssues = (params) => axios.get(`${API}/manage-issues`, { params, withCredentials: true });
const updateStatus = (id, status) => axios.patch(`${API}/manage-issues/${id}/status`, { status }, { withCredentials: true });
const updateProgress = (id, progress) =>
    axios.patch(
        `${API}/manage-issues/${id}/progress`,
        { progress },
        { withCredentials: true }
    );
const updateVoting = (id, publicVoting) => {
    return axios.patch(
        `${API}/${id}/voting`,
        { publicVoting },
        { withCredentials: true }
    );
};

const getProfile = () => axios.get(`${API}/profile`, { withCredentials: true });
const updateProfile = (data) => axios.put(`${API}/profile`, data, { withCredentials: true });

export default { 
    getDashboard, 
    getAnalytics, 
    getManageIssues, 
    updateStatus, 
    updateProgress, 
    updateVoting,
    getProfile,
    updateProfile 
};