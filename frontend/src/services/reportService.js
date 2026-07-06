import axios from "axios";

const API_URL = "http://localhost:5000/api/report";

export const submitReport = async (issueId, reportData) => {
  const res = await axios.post(
    `${API_URL}/${issueId}`,
    reportData,
    {
      withCredentials: true,
    }
  );

  return res.data;
};