import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/style.css";

function Contact({ onNavigate, userId, fullname }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }
    console.log("Message submitted:", message);
    setSubmitted(true);
    setMessage("");
  };

  return (
    <div className="contact-page">
      <Navbar role="user" onNavigate={onNavigate} userId={userId} fullname={fullname} />

      <div className="contact-container">
        <h1>Contact Us</h1>

        <section className="">
        <p>Email: JPA@carrental.com</p>
        <p>Phone: +63 912 345 6789</p>
        <p>Address: 123 Main St, Manila, Philippines</p>
        </section>

        <section className="contact-form">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              required
            ></textarea>
            <button type="submit" className="main-btn">
              Send
            </button>
          </form>
          {submitted && <p className="success-msg">Thank you! Your message has been sent.</p>}
        </section>
      </div>
    </div>
  );
}

export default Contact;
