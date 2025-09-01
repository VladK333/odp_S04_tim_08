import React from "react";
import "./Dropdown.css";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="dropdown" onClick={onClose}>
      <ul>
        <li>Chat 1:</li>
        <li>Chat 2:</li>
        <li>Chat 3:</li>
      </ul>
    </div>
  );
};

export default Dropdown;
