import { useState } from "react";

const FILTER_OPTIONS = [
  { value: "NAME_ASC", label: "Name A-Z" },
  { value: "NAME_DESC", label: "Name Z-A" },
  { value: "PRICE_ASC", label: "Price: Low to High" },
  { value: "PRICE_DESC", label: "Price: High to Low" },
];

export default function Filter({ selectedOption, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    if (onChange) {
      onChange(value);
    }
    setIsOpen(false);
  };

  const current = FILTER_OPTIONS.find(
    (option) => option.value === selectedOption
  );

  return (
    <div className="filter-container">
      <button
        type="button"
        className="filter-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {current ? current.label : "Filter"}
        <span className="filter-toggle-arrow">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="filter-panel">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`filter-option-btn ${
                option.value === selectedOption ? "active" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}

          {selectedOption && (
            <button
              type="button"
              className="filter-clear-btn"
              onClick={() => handleSelect(null)}
            >
              Clear filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}