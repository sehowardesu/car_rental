import React from "react";
import "../styles/style.css";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar"; 

function Profile({ fullname, email, onBack, onLogout, onNavigate, role = "user" }) {
  return (
    <div className="profile-page">
      
      <Navbar role={role} onLogout={onLogout} onNavigate={onNavigate} />

 
      <a href="/" className="fixed-logo">
        <img src={logo} alt="LOGO" />
      </a>

      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-info">
          <p><strong>Full Name:</strong> {fullname}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Role:</strong> {role}</p>
        </div>

      </div>
    </div>
  );
}

export default Profile;
