import React from "react";

function WelcomeSection(props) {
    return (
        <div className="welcome-section">
            <h2 className="welcome-text">Welcome,</h2>
            <h1 className="user-name">{props.user?.name}</h1> {/*  ?. this means render the name only is there is user or if user has been rendered */}
            <h2 className="welcome-text">Track and manage your civic reports.</h2>

        </div>
    )
}
export default WelcomeSection;