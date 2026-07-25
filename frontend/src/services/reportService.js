import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/report`;

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

export const getPendingReports = async () => {
  const res = await axios.get(`${API_URL}/pending`, {
    withCredentials: true,
  });

  return res.data;
};

export const approveReport = async (reportId) => {
  const res = await axios.patch(
    `${API_URL}/approve/${reportId}`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
};

export const rejectReport = async (reportId) => {
  const res = await axios.patch(
    `${API_URL}/reject/${reportId}`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
};