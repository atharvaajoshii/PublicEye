//aak

import axios from "axios";

const API_URL = "http://localhost:5000/api/issues";

export const createIssue = async (formData) => {
  const response = await axios.post(
    API_URL,
    formData,
    {
      withCredentials:true,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};