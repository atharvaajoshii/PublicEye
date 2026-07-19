// Atmika

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import AnalyticsChart from "../components/AnalyticsChart";
import analyticsService from "../services/analyticsService";

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
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await analyticsService.getAnalytics();

      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalReports = analytics.monthly.reduce(
    (sum, item) => sum + item.issues,
    0,
  );

  const resolved = analytics.resolution.length
    ? analytics.resolution[analytics.resolution.length - 1].resolved
    : 0;

  const pending = totalReports - resolved;

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="analytics-title">
          <h1>Analytics Dashboard</h1>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
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

          <div className="analytics-grid two-column">
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

          <div className="analytics-grid two-column">
            <DonutChartCard
              title="Status Distribution"
              data={analytics.status}
              dataKey="issues"
              nameKey="status"
            />

            <LineChartCard
              title="Resolution Trend"
              data={analytics.resolution}
              dataKey="resolved"
              XKey="month"
            />
          </div>

          {/* Full Width */}

          <div className="analytics-grid">
            <BarChartCard
              title="Area Distribution"
              data={analytics.area}
              dataKey="issues"
              XKey="area"
            />
          </div>

          <RankingCard title="Top Voted Issues" data={analytics.topVotes} />
        </>
      )}
    </div>
  );
}

export default Analytics;
