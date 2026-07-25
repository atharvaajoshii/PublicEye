import "../styles/ButtonLoader.css";

const ButtonLoader = ({ text = "Loading..." }) => {
  return (
    <span className="button-loader-wrapper">
      <span className="button-loader"></span>
      <span>{text}</span>
    </span>
  );
};

export default ButtonLoader;