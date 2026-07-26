import { useRef, useState } from "react";
import { FiUploadCloud, FiX, FiImage } from "react-icons/fi";

function ImageDropzone({ file, onChange }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const setFile = (nextFile) => {
    if (preview) URL.revokeObjectURL(preview);

    if (nextFile) {
      setPreview(URL.createObjectURL(nextFile));
    } else {
      setPreview(null);
    }

    onChange(nextFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

  const handleBrowse = (e) => {
    const picked = e.target.files?.[0];
    if (picked) setFile(picked);
  };

  if (preview) {
    return (
      <div className="dropzone dropzone-filled">
        <img src={preview} alt="Upload preview" className="dropzone-preview" />
        <div className="dropzone-preview-meta">
          <FiImage />
          <span>{file?.name}</span>
        </div>
        <button
          type="button"
          className="dropzone-remove"
          onClick={() => {
            setFile(null);
            if (inputRef.current) inputRef.current.value = "";
          }}
          aria-label="Remove image"
        >
          <FiX />
        </button>
      </div>
    );
  }

  return (
    <label
      className={`dropzone ${dragActive ? "is-dragging" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleBrowse}
        hidden
      />
      <div className="dropzone-icon">
        <FiUploadCloud size={20} />
      </div>
      <p className="dropzone-title">Drop an image, or click to browse</p>
      <span className="dropzone-subtitle">PNG or JPG, up to 10MB</span>
    </label>
  );
}

export default ImageDropzone;