import React, { useState } from "react";
import "./Register.css";
import logo from "../assets/logo.png";

function Register({ onNavigate }) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { fullname, username, contact_number: contactNumber, address, email, password };

    try {
      const response = await fetch("http://localhost/car_rental/backend/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      
      const result = await response.json();

      if (result.success) {
        alert(result.message);

       
        onNavigate("dashboard", {
          userId: result.id,      
          fullname: result.fullname,
          username: result.username
        });

      } else {
        alert(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <a href="/" className="fixed-logo">
        <img src={logo} alt="LOGO" />
      </a>

      <div className="register-form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name (e.g., Juan Dela Cruz)"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email (example@gmail.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="main-btn">
            Register
          </button>
        </form>
        <button className="back-btn" onClick={() => onNavigate("authChoice")}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

export default Register;
