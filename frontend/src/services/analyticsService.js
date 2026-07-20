import axios from "axios";

const API = "http://localhost:5000/api/analytics";

const config = {
    withCredentials: true,
};

const analyticsService = {
    getAnalytics(from,to){
        return axios.get(`${API}/analytics?from=${from}&to=${to}`, config);
    },
};

export default analyticsService;