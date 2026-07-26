// Atmika

import React, { useEffect, useRef, useState } from "react";
import { FiDownload, FiFile, FiFileText as FiFileTextIcon, FiChevronDown } from "react-icons/fi";

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
  CustomSelect,
} from "../components/Analytics";

import { FiClock, FiCheckCircle, FiAlertCircle, FiFileText } from "react-icons/fi";

const PERIOD_OPTIONS = [
  { value: "30", label: "Last 30 Days" },
  { value: "month", label: "This Month" },
  { value: "lastMonth", label: "Last Month" },
  { value: "6", label: "Last 6 Months" },
  { value: "year", label: "This Year" },
  { value: "custom", label: "Custom Range" },
];

function Analytics() {
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [period, setPeriod] = useState("30");
  const [exportOpen, setExportOpen] = useState(false);

  const dashboardRef = useRef(null);
  const exportRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exportRef.current && !exportRef.current.contains(e.target)) {
        setExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const totalReports = analytics.monthly.reduce((sum, item) => sum + item.issues, 0);

  const resolved = analytics.resolution.reduce((sum, item) => sum + item.resolved, 0);

  const pending = analytics.status
    .filter(
      (item) =>
        item.status === "Pending" || item.status === "Assigned" || item.status === "In Progress"
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
        start.setDate(end.getDate() - 30);
        break;
    }
    setFrom(start.toISOString().split("T")[0]);
    setTo(end.toISOString().split("T")[0]);
  };

  const exportPDF = async () => {
    setExportOpen(false);
    const canvas = await html2canvas(dashboardRef.current, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;
    pdf.addImage(img, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save("analytics.pdf");
  };

  const exportExcel = () => {
    setExportOpen(false);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(analytics.category), "Category");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(analytics.monthly), "Monthly");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(analytics.resolution), "Resolution");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(analytics.status), "Status");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(analytics.area), "Area");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(analytics.topVotes), "Top Votes");

    XLSX.writeFile(workbook, "analytics.xlsx");
  };

  return (
    <div className="analytics-page">
      <div className="analytics-title">
        <h1>Analytics Dashboard</h1>
        <p className="analytics-subtitle">A live look at how issues move from report to resolution</p>
      </div>

      {/* Command Header */}
      <div className="command-header">
        <div className="command-header-group">
          <CustomSelect
            value={period}
            options={PERIOD_OPTIONS}
            ariaLabel="Select reporting period"
            onChange={(value) => {
              setPeriod(value);
              changePeriod(value);
            }}
          />

          {period === "custom" && (
            <div className="custom-range">
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
              <span>to</span>
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
          )}
        </div>

        <div className="export-menu" ref={exportRef}>
          <button
            className={`export-btn ${exportOpen ? "is-active" : ""}`}
            onClick={() => setExportOpen((prev) => !prev)}
          >
            <FiDownload />
            Export
            <FiChevronDown className={`export-chevron ${exportOpen ? "is-open" : ""}`} />
          </button>

          <div className={`export-dropdown ${exportOpen ? "is-open" : ""}`}>
            <button onClick={exportPDF}>
              <FiFileTextIcon /> PDF
            </button>
            <button onClick={exportExcel}>
              <FiFile /> Excel
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="analytics-loading">
          <div className="loading-spinner" />
          <p>Loading analytics…</p>
        </div>
      ) : totalReports === 0 ? (
        <div className="no-analytics">
          <div className="no-analytics-icon">
            <FiFileText size={28} />
          </div>
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
              icon={<FiClock size={22} />}
              color="var(--primary-dark-alt)"
              glow="var(--primary-alpha-10)"
            />

            <MetricCard
              title="Total Reports"
              value={totalReports}
              icon={<FiFileText size={22} />}
              color="var(--info)"
              glow="rgba(59, 130, 246, 0.10)"
            />

            <MetricCard
              title="Resolved"
              value={resolved}
              icon={<FiCheckCircle size={22} />}
              color="var(--accent-dark)"
              glow="var(--accent-alpha-10)"
            />

            <MetricCard
              title="Pending"
              value={pending}
              icon={<FiAlertCircle size={22} />}
              color="var(--warning)"
              glow="rgba(230, 138, 46, 0.10)"
            />
          </div>

          {/* Bento Row 1 — Monthly trend takes the lead, category sits beside it */}
          <div className="bento-row bento-row-1">
            <DonutChartCard
              title="Category Distribution"
              data={analytics.category}
              dataKey="count"
              nameKey="category"
            />
            <AreaChartCard title="Monthly Reports" data={analytics.monthly} dataKey="issues" XKey="month" />
          </div>

          {/* Bento Row 2 — Resolution trend leads, status distribution beside it */}
          <div className="bento-row bento-row-2">
            <LineChartCard title="Resolution Trend" data={analytics.resolution} dataKey="resolved" XKey="month" />
            <DonutChartCard title="Status Distribution" data={analytics.status} dataKey="issues" nameKey="status" />
          </div>

          {/* Bento Row 3 — Area breakdown and top-voted ranking */}
          <div className="bento-row bento-row-3">
            <BarChartCard title="Area Distribution" data={analytics.area} dataKey="issues" XKey="area" />
            <RankingCard title="Top Voted Issues" data={analytics.topVotes} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;