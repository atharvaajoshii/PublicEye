import axios from "axios";

const API = "http://localhost:5000/api/admin";

const adminService = {
    getDashboard() { return axios.get(`${API}/dashboard`); },
    getAnalytics() { return axios.get(`${API}/analytics`); },
    getUsers() { return axios.get(`${API}/users`); },
    getAllOfficers() { return axios.get(`${API}/officers`); },
    getOfficerById(id) { return axios.get(`${API}/officers/${id}`); },
    createOfficers(data) { return axios.post(`${API}/officers`,data); },
    updateOfficers(id, data) { return axios.put(`${API}/officers/${id}`, data); },
    deleteOfficers(id) { return axios.delete(`${API}/officers/${id}`); },
    getIssues() { return axios.get(`${API}/issues`); },
    logout() { return axios.post(`${API}/logout`); }
};

export default adminService;