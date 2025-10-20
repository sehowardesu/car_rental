import React from "react";
import "./Frontpage.css"; 
import logo from "../assets/logo.png"; 


function Frontpage({ onNavigate }) {
  return (
    <div className="frontpage">
     
      <a href="/" className="fixed-logo">
       <img src={logo} alt="LOGO" />
     </a>


    
      <div className="hero">
        <div className="hero-overlay">
          <h2>Welcome to JP AUTOHUB</h2>
          <p>Find the perfect car for your next trip!</p>
          <button className="rent-btn" onClick={() => onNavigate("authChoice")}>
            Rent Now
          </button>
        </div>
      </div>

     
      <div className="about">
        <div className="about-content">
          <div className="about-text">
            <h3>About Us</h3>
            <p>
              We provide reliable and affordable cars for your travel needs.
              Choose from a wide range of vehicles and enjoy a hassle-free rental experience.
            </p>
          </div>
          <div className="about-image">
            <img src="src/assets/about.jpg" alt="About us" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frontpage;
