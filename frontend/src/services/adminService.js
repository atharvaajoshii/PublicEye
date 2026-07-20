import axios from "axios";

const API = "http://localhost:5000/api/admin";

const config = {
    withCredentials: true,
};

const adminService = {
    getDashboard() {
        return axios.get(`${API}/dashboard`, config);
    },
    getAnalytics() {
        return axios.get(`${API}/analytics`, config);
    },



    getAllUsers(params) {
        return axios.get(`${API}/users`, {
            ...config,
            params,
        });
    },
    getUserById(id) {
        return axios.get(`${API}/users/${id}`, config);
    },
    toggleUserStatus(id) {
        return axios.patch(`${API}/users/${id}/status`, {}, config);
    },


    getAllOfficers() {
        return axios.get(`${API}/officers`, config);
    },
    getOfficerById(id) {
        return axios.get(`${API}/officers/${id}`, config);
    },
    createOfficer(data) {
        return axios.post(`${API}/officers`, data, config);
    },
    updateOfficer(id, data) {
        return axios.put(`${API}/officers/${id}`, data, config);
    },
    deleteOfficer(id) {
        return axios.delete(`${API}/officers/${id}`, config);
    },


    getAllIssues(params = {}) {
        return axios.get(`${API}/issue/all`, {
            ...config,
            params,
        });
    },
    getIssueById(id) {
        return axios.get(`${API}/issue/${id}`, config);
    },
    assignOfficer(id, officerId) {
        return axios.patch(
            `${API}/issue/${id}/assignofficer`,
            { officerId },
            config
        );
    },
    reassignOfficer(id, officerId) {
        return axios.patch(
            `${API}/issue/${id}/reassignofficer`,
            { officerId },
            config
        );
    },
    deleteIssue(id) {
        return axios.delete(`${API}/issue/${id}/deleteissue`, config);
    },



    getAllReports() {
        return axios.get(`${API}/reports`, config);
    },
    getReportById(id) {
        return axios.get(`${API}/reports/${id}`, config);
    },
    approveReport(id) {
        return axios.patch(`${API}/reports/${id}/approve`, {}, config);
    },
    rejectReport(id) {
        return axios.patch(`${API}/reports/${id}/reject`, {}, config);
    },
};

export default adminService;