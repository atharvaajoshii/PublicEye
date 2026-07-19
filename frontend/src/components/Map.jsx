// Atmika

import 'leaflet/dist/leaflet.css';
import toast from 'react-hot-toast';



import { MapContainer, TileLayer,useMapEvents } from "react-leaflet";

function Map({ formData, setFormData }) {

    function ClickHandler({setFormData}){
        useMapEvents({
            click(e){
                const lat = e.latlng.lat
                const lng= e.latlng.lng
                setFormData(prev=>({
                    ...prev,
                    latitude:lat,
                    longitude:lng,
                }))
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