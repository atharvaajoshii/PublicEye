// Atmika

import 'leaflet/dist/leaflet.css';
import toast from 'react-hot-toast';

import { getAddress } from "../services/getAddress";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

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

        </MapContainer>
    );
}

export default Map;