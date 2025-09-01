import React from "react";
//import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  //const navigate = useNavigate();

  return (
    <div
      style={{
         position: "fixed",   //  fiksira div na ekranu
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#e0a0e9",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 8px 20px rgba(224, 160, 233, 0.5)",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>404</h1>
        <h2 style={{ marginBottom: "1rem", color: "#f06292" }}>
          Page not found
        </h2>
        <p style={{ marginBottom: "2rem", color: "#d0a0d9" }}>
          Page doesn't exist
        </p>
        <button
          style={{
            backgroundColor: "#d85ede",
            border: "none",
            borderRadius: "12px",
            padding: "12px 28px",
            color: "white",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#bf4aca")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#d85ede")
          }
          aria-label="Back to Home"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;