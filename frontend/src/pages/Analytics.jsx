// Atmika

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FiDownload } from "react-icons/fi";

// import AnalyticsChart from "../components/AnalyticsChart";
import analyticsService from "../services/analyticsService";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

import {
  AreaChartCard,
  LineChartCard,
  DonutChartCard,
  BarChartCard,
  MetricCard,
  RankingCard,
} from "../components/Analytics";

import {
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiFileText,
} from "react-icons/fi";

function Analytics() {
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [period, setPeriod] = useState("30");

  const dashboardRef = useRef(null);

  const [analytics, setAnalytics] = useState({
    category: [],
    monthly: [],
    resolution: [],
    area: [],
    status: [],
    avgTime: {
      averageDays: 0,
    },
    topVotes: [],
  });

  useEffect(() => {
    const today = new Date();

    const start = new Date();

    start.setDate(today.getDate() - 30);

    setFrom(start.toISOString().split("T")[0]);

    setTo(today.toISOString().split("T")[0]);
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await analyticsService.getAnalytics(from, to);
      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (from && to) fetchAnalytics();
  }, [from, to]);

  const totalReports = analytics.monthly.reduce(
    (sum, item) => sum + item.issues,
    0,
  );

  const resolved = analytics.resolution.reduce(
    (sum, item) => sum + item.resolved,
    0,
  );

  const pending = analytics.status
    .filter(
      (item) =>
        item.status === "Pending" ||
        item.status === "Assigned" ||
        item.status === "In Progress",
    )
    .reduce((sum, item) => sum + item.issues, 0);

  const changePeriod = (value) => {
    let end = new Date();
    let start = new Date(end);

    switch (value) {
      case "30":
        start.setDate(end.getDate() - 30);
        break;

      case "month":
        start = new Date(end.getFullYear(), end.getMonth(), 1);
        break;

      case "lastMonth":
        start = new Date(end.getFullYear(), end.getMonth() - 1, 1);
        end = new Date(end.getFullYear(), end.getMonth(), 0);
        break;

      case "6":
        start.setMonth(end.getMonth() - 6);
        break;

      case "year":
        start = new Date(end.getFullYear(), 0, 1);
        break;

      case "custom":
        return;

      default:
        // Last 30 Days
        start.setDate(end.getDate() - 30);
        break;
    }
    setFrom(start.toISOString().split("T")[0]);
    setTo(end.toISOString().split("T")[0]);
  };

  const exportPDF = async () => {
    const canvas = await html2canvas(dashboardRef.current, {
      scale: 2,
    });

    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();

    const pageHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(img, "PNG", 0, 0, pageWidth, pageHeight);

    pdf.save("analytics.pdf");
  };

  const exportExcel = () => {
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(analytics.category),
      "Category",
    );

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(analytics.monthly),
      "Monthly",
    );

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(analytics.resolution),
      "Resolution",
    );

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(analytics.status),
      "Status",
    );

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(analytics.area),
      "Area",
    );

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(analytics.topVotes),
      "Top Votes",
    );

    XLSX.writeFile(workbook, "analytics.xlsx");
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="analytics-title">
          <h1>Analytics Dashboard</h1>
        </div>
        <div className="analytics-filter">
          <div className="analytics-actions">
            <select
              value={period}
              onChange={(e) => {
                setPeriod(e.target.value);
                changePeriod(e.target.value);
              }}
              className="period-select"
            >
              <option value="30">Last 30 Days</option>
              <option value="month">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="6">Last 6 Months</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>

            {period === "custom" && (
              <div className="custom-range">
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />

                <span>to</span>

                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            )}

            <div className="export-menu">
              <button className="export-btn">
                <FiDownload />
                Export
              </button>

              <div className="export-dropdown">
                <button onClick={exportPDF}>PDF</button>

                <button onClick={exportExcel}>Excel</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : totalReports === 0 ? (
        <div className="no-analytics">
          <h2>No analytics available</h2>
          <p>There are no issues reported for the selected date range.</p>
        </div>
      ) : (
        <div ref={dashboardRef}>
          {/* KPI Cards */}

          <div className="metrics-grid">
            <MetricCard
              title="Average Resolution"
              value={analytics.avgTime.averageDays}
              unit=" days"
              icon={<FiClock size={26} />}
            />

            <MetricCard
              title="Total Reports"
              value={totalReports}
              icon={<FiFileText size={26} />}
            />

            <MetricCard
              title="Resolved"
              value={resolved}
              icon={<FiCheckCircle size={26} />}
              color="#8F9D68"
            />

            <MetricCard
              title="Pending"
              value={pending}
              icon={<FiAlertCircle size={26} />}
              color="#FF8A4C"
            />
          </div>

          {/* First Row */}

          <div className="row1 analytics-grid two-column">
            <DonutChartCard
              title="Category Distribution"
              data={analytics.category}
              dataKey="count"
              nameKey="category"
            />

            <AreaChartCard
              title="Monthly Reports"
              data={analytics.monthly}
              dataKey="issues"
              XKey="month"
            />
          </div>

          {/* Second Row */}

          <div className="row2 analytics-grid two-column">
            <LineChartCard
              title="Resolution Trend"
              data={analytics.resolution}
              dataKey="resolved"
              XKey="month"
            />

            <DonutChartCard
              title="Status Distribution"
              data={analytics.status}
              dataKey="issues"
              nameKey="status"
            />
          </div>

          {/* Full Width */}

          <div className="row3 analytics-grid">
            <BarChartCard
              title="Area Distribution"
              data={analytics.area}
              dataKey="issues"
              XKey="area"
            />

            <RankingCard title="Top Voted Issues" data={analytics.topVotes} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
