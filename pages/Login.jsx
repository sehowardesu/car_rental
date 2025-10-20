import React, { useState } from "react";
import "./Login.css";
import logo from "../assets/logo.png"; 

function Login({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (onLogin) onLogin({ id: 1, fullname: "John Doe", role: "user" });
  };

  return (
    <div className="login-page">

      <a href="/" className="fixed-logo">
        <img src={logo} alt="LOGO" />
      </a>

      <div className="login-form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="main-btn">
            Login
          </button>
        </form>
        <button className="back-btn" onClick={onBack}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

export default Login;
