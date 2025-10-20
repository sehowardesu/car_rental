import React from "react";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function About({ onLogout, onNavigate }) {
  return (
    <div className="about-page">
      <Navbar role="user" onLogout={onLogout} onNavigate={onNavigate} />

      <div className="page-content text-center mt-5">
        <h1>About Us</h1>
        <p>
          We provide reliable and affordable cars for your travel needs.
          Choose from a wide range of vehicles and enjoy a hassle-free rental experience.
        </p>
      </div>
    </div>
  );
}

export default About;
