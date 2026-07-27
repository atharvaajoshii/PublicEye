import "../styles/LoadingSpinner.css";
import logo from "../assets/logo.png";

export default function LoadingSpinner({
  text = "Loading..."
}) {
  return (
    <div className="loading-container">
      <div className="logo-loader">
        <svg className="spinner" viewBox="0 0 120 120">
          <circle
            className="spinner-track"
            cx="60"
            cy="60"
            r="54"
          />
          <circle
            className="spinner-ring"
            cx="60"
            cy="60"
            r="54"
          />
        </svg>

        <img
          src={logo}
          alt="PublicEye"
          className="loading-logo"
        />
      </div>

      <p>{text}</p>
    </div>
  );
}