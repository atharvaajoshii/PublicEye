import IssueMap from "../components/IssueMap";
import "../styles/Map.css";

function Maps() {
    return (
        <div className="issues-map-page">
            <div className="issues-map-header">
                <span className="issues-map-eyebrow">Live overview</span>
                <h1>All Issues</h1>
            </div>

            <div className="issues-map-canvas-wrap">
                <IssueMap />
            </div>
        </div>
    );
}

export default Maps;