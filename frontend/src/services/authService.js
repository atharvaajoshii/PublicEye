import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const register = async (userData) => {
    const res = await axios.post(
        `${API_URL}/register`,
        userData,
        {
            withCredentials: true,
        }
    );
    return res.data;
};

const login = async (credentials) => {
    const res = await axios.post(
        `${API_URL}/login`,
        credentials,
        {
            withCredentials: true,
        }
    );
    return res.data;
};

const logout = async () => {
    const res = await axios.post(
        `${API_URL}/logout`,
        {},
        {
            withCredentials: true,
        }
    );
    return res.data;
};

const getCurrentUser = async () => {
    const res = await axios.get(
        `${API_URL}/me`,
        {
            withCredentials: true,
        }
    );
    return res.data;
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
};