import React from "react";
import ReportForm from "../components/ReportForm";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom"
import { GoChevronLeft } from "react-icons/go";

function OfficerReport() {
      const navigate = useNavigate();
  
  return (
    <div>
      <Sidebar />
      <button onClick={() => navigate(-1)}>
        <GoChevronLeft />Back
      </button>
      <h1>Report Issue</h1>
      <ReportForm />
    </div>
  );
}

export default OfficerReport;