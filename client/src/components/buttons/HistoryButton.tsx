import React, { useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import './HistoryButton.css';

interface HistoryButtonProps {
  className?: string;
}

const HistoryButton: React.FC<HistoryButtonProps> = ({ className }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={toggleDropdown}
        className={className || "historyButton"}
      >
        History ▼
      </button>

      <Dropdown isOpen={dropdownOpen} onClose={closeDropdown} />
    </div>
  );
};

export default HistoryButton;
