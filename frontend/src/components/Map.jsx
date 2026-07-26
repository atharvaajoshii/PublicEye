// Atmika

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";
import { FiMapPin, FiCheck, FiCrosshair } from "react-icons/fi";

import { getAddress } from "../services/getAddress";

import "../styles/Map.css";

// Custom Iris-themed pin — replaces the default Leaflet marker image entirely.
const pinIcon = L.divIcon({
  className: "custom-map-pin",
  html: `<span class="map-pin-ring"></span><span class="map-pin-dot"></span>`,
  iconSize: [34, 34],
  iconAnchor: [17, 30],
});

function Map({ formData, setFormData }) {
  const [locating, setLocating] = useState(false);

  function ClickHandler() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setLocating(true);

        try {
          const place = await getAddress(lat, lng);
          setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lng,
            location: place.formatted,
          }));
        } finally {
          setLocating(false);
        }
      },
    });
    return null;
  }

  const hasLocation = Boolean(formData.latitude && formData.longitude);

  return (
    <div className="map-shell">
      <MapContainer
        center={[12.8616, 74.8846]}
        zoom={13}
        className="map-canvas"
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler />

        {hasLocation && <Marker position={[formData.latitude, formData.longitude]} icon={pinIcon} />}
      </MapContainer>

      <div className="map-hint-dock">
        {!hasLocation && !locating && (
          <div className="map-hint-pill">
            <FiCrosshair />
            <span>Tap the map to drop a pin</span>
          </div>
        )}

        {locating && (
          <div className="map-hint-pill is-loading">
            <span className="map-hint-spinner" />
            <span>Finding address…</span>
          </div>
        )}

        {hasLocation && !locating && (
          <div className="map-location-card">
            <div className="map-location-icon">
              <FiMapPin />
            </div>
            <div className="map-location-text">
              <p>{formData.location}</p>
              <span>
                {Number(formData.latitude).toFixed(5)}, {Number(formData.longitude).toFixed(5)}
              </span>
            </div>
            <div className="map-location-check">
              <FiCheck />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Map;