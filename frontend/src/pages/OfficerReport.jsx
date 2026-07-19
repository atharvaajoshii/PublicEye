import React from "react";
import ReportForm from "../components/ReportForm";
import { useNavigate } from "react-router-dom"
import { GoChevronLeft } from "react-icons/go";

function OfficerReport() {
      const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={() => navigate(-1)}>
        <GoChevronLeft />Back
      </button>
      <ReportForm />
    </div>
  );
}

export default OfficerReport;