// Atmika

import axios from "axios";

const API = "http://localhost:5000/api/officer";

const getDashboard = () => axios.get(`${API}/dashboard`, {withCredentials: true});
const getAnalytics = () => axios.get(`${API}/analytics`, { withCredentials: true });
const getManageIssues = (params) => axios.get(`${API}/manage-issues`, { params, withCredentials: true });
const updateStatus = (id, status) => axios.patch( `${API}/manage-issues/${id}/status`, { status }, { withCredentials: true });

export default { getDashboard, getAnalytics, getManageIssues, updateStatus };