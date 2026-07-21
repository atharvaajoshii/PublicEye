import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/geocode`;

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