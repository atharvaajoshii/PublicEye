//aak

import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/issues`;

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