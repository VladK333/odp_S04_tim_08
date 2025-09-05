import React, { useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import './HistoryButton.css';

interface HistoryButtonProps {
  className?: string;
  onClick?: () => void; // dodaj ovaj prop
}

const HistoryButton: React.FC<HistoryButtonProps> = ({ className, onClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
    if (onClick) onClick(); // pozovi onClick kad se dugme pritisne
  };

  const closeDropdown = () => setDropdownOpen(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={toggleDropdown} // ovde poziva onClick iz props
        className={className || "historyButton"}
      >
        History ▼
      </button>

      <Dropdown isOpen={dropdownOpen} onClose={closeDropdown} />
    </div>
  );
};

export default HistoryButton;
