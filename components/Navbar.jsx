import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ role, onLogout, onNavigate, userId, username }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button
            className="btn-close btn-close-white btn-sm"
            onClick={toggleSidebar}
          ></button>
        </div>

        <div className="sidebar-content d-flex flex-column">
          <button
            className="btn btn-link text-white text-start"
            onClick={() => onNavigate("userDashboard")}
          >
            Home
          </button>

          <button
            className="btn btn-link text-white text-start"
            onClick={() => onNavigate("profile")}
          >
            Profile
          </button>

          <button
            className="btn btn-link text-white text-start"
            onClick={() => onNavigate("about")}
          >
            About
          </button>

          <button
            className="btn btn-link text-white text-start"
            onClick={() => onNavigate("contact")}
          >
            Contact
          </button>

          {username && (
            <span className="text-white mt-3">Hello, {username}</span>
          )}

          {role && (
            <button
              className="btn btn-warning fw-semibold mt-3"
              onClick={onLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <button className="btn sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
    </>
  );
}

export default Navbar;
