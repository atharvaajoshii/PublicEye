import React from "react";

function WelcomeSection(props) {
    return (
        <div className="welcome-section">
            <p className="welcome-text">Welcome,</p>
            <h1 className="user-name">{props.user?.name}</h1> {/*  ?. this means render the name only is there is user or if user has been rendered */}
            <p className="welcome-text">Track and manage your civic reports.</p>

        </div>
    )
}
export default WelcomeSection;