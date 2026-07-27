import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FiSearch, FiMapPin, FiArrowRight } from "react-icons/fi";

import issueService from "../services/issueService";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import "../styles/Map.css";

import LoadingSpinner from "../components/LoadingSpinner";


const STATUS_FILTERS = ["All", "Pending", "Assigned", "In Progress", "Resolved", "Rejected"];

// Maps a status to one of the app's existing status-badge tokens — no new colors.
const STATUS_COLOR_VAR = {
  Pending: "var(--status-pending-text)",
  Assigned: "var(--primary)",
  "In Progress": "var(--status-progress-text)",
  Resolved: "var(--status-resolved-text)",
  Rejected: "var(--status-rejected-text)",
};

function statusIcon(status) {
  const color = STATUS_COLOR_VAR[status] || "var(--primary)";
  return L.divIcon({
    className: "custom-map-pin",
    html: `
      <span class="map-pin-ring" style="background:${color};opacity:0.25;"></span>
      <span class="map-pin-dot" style="background:${color};"></span>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 30],
  });
}

export default function IssueMap() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { user } = useAuth();
  const role = user?.role;

  const getIssueLink = (issueId) => {
    switch (role) {
      case "admin":
        return `/admin/manage-issues`;
      case "officer":
        return `/officer/manage-issues`;
      case "citizen":
        return `/all-issues`;
      default:
        return "/";
    }
  };

  useEffect(() => {
    async function fetchIssues() {
      setLoading(true);
      try {
        const res = await issueService.getAllIssues();
        setIssues(res.issues || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchIssues();
  }, []);

  const plottable = useMemo(
    () => issues.filter((issue) => issue.latitude && issue.longitude),
    [issues]
  );

  const visibleIssues = useMemo(() => {
    const query = search.trim().toLowerCase();

    return plottable.filter((issue) => {
      const matchesStatus = statusFilter === "All" || issue.status === statusFilter;
      const matchesSearch =
        !query ||
        issue.title?.toLowerCase().includes(query) ||
        issue.location?.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [plottable, search, statusFilter]);

  return (
    <div className="issue-map-shell">
      <MapContainer
        center={[12.8616, 74.8846]}
        zoom={13}
        className="issue-map-canvas"
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {visibleIssues.map((issue) => (
          <Marker key={issue._id} position={[issue.latitude, issue.longitude]} icon={statusIcon(issue.status)}>
            <Popup className="issue-popup">
              <div className="issue-popup-card">
                {issue.status && (
                  <span
                    className="issue-popup-status"
                    style={{ color: STATUS_COLOR_VAR[issue.status] || "var(--primary)" }}
                  >
                    {issue.status}
                  </span>
                )}
                <h3>{issue.title}</h3>
                <p>
                  <FiMapPin size={13} /> {issue.location}
                </p>
                <Link to={getIssueLink(issue._id)} className="issue-popup-link">
                  View Issue <FiArrowRight size={13} />
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating glass search + status filter dock */}
      <div className="issue-map-toolbar">
        <div className="issue-map-search">
          <FiSearch />
          <input
            type="text"
            placeholder="Search by title or location…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="issue-map-status-filters">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              type="button"
              className={`issue-map-status-pill ${statusFilter === status ? "is-active" : ""}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="issue-map-count-badge">
        {loading ? (
  <LoadingSpinner text="Loading issues..." />
) : (
  <p>
    {visibleIssues.length} of {plottable.length} issues shown
  </p>
)}
      </div>
    </div>
  );
}