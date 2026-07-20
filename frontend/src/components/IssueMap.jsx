import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import issueService from "../services/issueService";
import { useAuth } from "../context/AuthContext";
import "../styles/atharva.css"
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default function IssueMap() {
    const [issues, setIssues] = useState([]);

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
            try {
                const res = await issueService.getAllIssues();
                console.log(res);
                setIssues(res.issues);
            } catch (err) {
                console.log(err);
            }
        }

        fetchIssues();
    }, []);

    return (
        <div className="map-container-card">

            <MapContainer
                center={[12.8616, 74.8846]}
                zoom={13}
                style={{ height: "500px", width: "100%" }}
            >

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {issues.map(issue => (
                    issue.latitude &&
                    issue.longitude && (
                        <Marker
                            key={issue._id}
                            position={[issue.latitude, issue.longitude]}
                        >
                            <Popup>
                                <h3>{issue.title}</h3>
                                <p>{issue.location}</p>

                                <Link to={getIssueLink(issue._id)}>
                                    View Issue →
                                </Link>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
}