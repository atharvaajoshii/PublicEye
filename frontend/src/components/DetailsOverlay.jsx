// DetailsOverlay.jsx
import React from "react";
import "../styles/atharva.css";

function DetailsOverlay({
    open,
    title,
    children,
    actions,
    onClose,
}) {
    if (!open) return null;

    return (
        <div className="overlay-backdrop" onClick={onClose}>
            <div
                className="overlay-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="overlay-header">
                    <h2>{title}</h2>

                    <button
                        className="overlay-close"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </header>

                <div className="overlay-body">
                    {children}
                </div>

                {actions && (
                    <footer className="overlay-footer">
                        {actions}
                    </footer>
                )}
            </div>
        </div>
    );
}

export default DetailsOverlay;