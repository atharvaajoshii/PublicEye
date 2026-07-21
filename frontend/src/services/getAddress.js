import axios from "axios";

const API_URL = "http://localhost:5000/api/geocode";

export const getAddress = async (lat, lng) => {
  const response = await axios.get(`${API_URL}/reverse`, {
    params: {
      lat,
      lng,
    },
    withCredentials: true,
  });

  return response.data;
};