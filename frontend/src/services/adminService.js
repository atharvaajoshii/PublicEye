import axios from "axios";

const API = "http://localhost:5000/api/admin";

const config = {
    withCredentials: true,
};

const adminService = {
    getDashboard() { return axios.get(`${API}/dashboard`, config); },
    getAnalytics() { return axios.get(`${API}/analytics`, config); },
    getUsers() { return axios.get(`${API}/users`, config); },
    getAllOfficers() { return axios.get(`${API}/officers`, config); },
    getOfficerById(id) { return axios.get(`${API}/officers/${id}`, config); },
    createOfficers(data) { return axios.post(`${API}/officers`,data, config); },
    updateOfficers(id, data) { return axios.put(`${API}/officers/${id}`, data, config); },
    deleteOfficers(id) { return axios.delete(`${API}/officers/${id}`, config); },
    getIssues() { return axios.get(`${API}/issues`); },
};

export default adminService;