import React from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "absolute",
        top: "59px",
        left: "-533px",
        backgroundColor: "#222",
        border: "1px solid #cd55abff",
        borderRadius: "6px",
        padding: "15px 20px",
        color: "white",
        zIndex: 1000,
        height:'527px',
        width: "1147px",
      }}
      onClick={onClose} // zatvori dropdown na klik
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ padding: "10px 15px", cursor: "pointer", borderRadius: "4px", transition: "background-color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#cd55abff")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          Chat 1:
        </li>
        <li style={{ padding: "10px 15px", cursor: "pointer", borderRadius: "4px", transition: "background-color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#cd55abff")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          Chat 2:
        </li>
        <li style={{ padding: "10px 15px", cursor: "pointer", borderRadius: "4px", transition: "background-color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#cd55abff")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          Chat 3:
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;