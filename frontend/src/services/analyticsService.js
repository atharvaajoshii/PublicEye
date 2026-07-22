import axios from "axios";

const API = `${process.env.REACT_APP_API_URL}/analytics`;

const config = {
    withCredentials: true,
};

const analyticsService = {
    getAnalytics(from,to){
        return axios.get(`${API}/analytics?from=${from}&to=${to}`, config);
    },
};

export default analyticsService;