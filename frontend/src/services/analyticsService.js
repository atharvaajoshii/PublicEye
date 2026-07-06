import axios from "axios";

const API = "http://localhost:5000/api/analytics";

const config = {
    withCredentials: true,
};

const analyticsService = {
    getAnalytics() { return axios.get(`${API}/analytics`, config); },
};

export default analyticsService;