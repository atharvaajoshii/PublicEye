// Atmika

import 'leaflet/dist/leaflet.css';
import toast from 'react-hot-toast';

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { getAddress } from "../services/getAddress";
import L from "leaflet";

import '../styles/Map.css'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function Map({ formData, setFormData }) {

    function ClickHandler({ setFormData }) {
        useMapEvents({
            click: async (e) => {

                const { lat, lng } = e.latlng;

                const place = await getAddress(lat, lng);

                setFormData(prev => ({
                    ...prev,
                    latitude: lat,
                    longitude: lng,
                    location: place.formatted
                }));
            }
        })
        return null;
    }

    return (
        <MapContainer
            center={[12.8616, 74.8846]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickHandler setFormData={setFormData} />

{formData.latitude && formData.longitude && (
    <Marker
        position={[formData.latitude, formData.longitude]}
    />
)}

        </MapContainer>
    );
}

export default Map;