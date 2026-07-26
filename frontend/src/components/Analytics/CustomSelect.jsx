import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

/**
 * CustomSelect
 * A frosted, elevated micro-dropdown that replaces the native <select>.
 * Keyboard accessible, closes on outside click / Escape, animates open with
 * a soft slide + fade rather than the browser's default popover.
 */
function CustomSelect({ value, options, onChange, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const active = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="custom-select" ref={rootRef}>
      <button
        type="button"
        className={`custom-select-trigger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        <span>{active?.label}</span>
        <FiChevronDown className="custom-select-chevron" />
      </button>

      <div className={`custom-select-menu ${open ? "is-open" : ""}`} role="listbox">
        {options.map((opt) => (
          <button
            type="button"
            key={opt.value}
            role="option"
            aria-selected={opt.value === value}
            className={`custom-select-option ${opt.value === value ? "is-active" : ""}`}
            onClick={() => {
              onChange(opt.value);
              setOpen(false);
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CustomSelect;