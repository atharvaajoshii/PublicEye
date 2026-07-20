import IssueMap from "../components/IssueMap";

function Maps() {
    return (
        <>
            <h1 className="officer-dashboard-main-title">All Issues</h1>

            <div className="map">
                <IssueMap />
            </div>
        </>
    );
}

export default Maps;