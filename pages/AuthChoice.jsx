import React from "react";
import "./AuthChoice.css";
import logo from "../assets/logo.png"; 

function AuthChoice({ onNavigate }) {
  return (
    <div className="auth-choice-page">
     
      <a href="/" className="fixed-logo">
        <img src={logo} alt="LOGO" />
      </a>

      <div className="auth-choice-content">
        <h1>Welcome! Please choose:</h1>
        <div className="auth-buttons">
          <button className="main-btn" onClick={() => onNavigate("login")}>
            Login
          </button>
          <button className="main-btn" onClick={() => onNavigate("register")}>
            Register
          </button>
        </div>
        <button className="back-btn" onClick={() => onNavigate("frontpage")}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
}

export default AuthChoice;
