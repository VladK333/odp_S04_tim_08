import React, { useState } from "react";
import Dropdown from "../dropdown/Dropdown";

const YourComponent = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={toggleDropdown}
        style={{
          color: "#cd55abff",
          background: "transparent",
          border: "1px solid #cd55abff",
          borderRadius: "6px",
          padding: "5px 15px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        History ▼
      </button>

      <Dropdown isOpen={dropdownOpen} onClose={closeDropdown} />
    </div>
  );
};

export default YourComponent;