import React, { useState } from "react";
import "../Css/ContactUs.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    // Optionally handle the data here or send to backend
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions, feedback, or suggestions? We'd love to hear from you.</p>
      </div>

      <div className="contact-content">
        {/* LEFT SIDE - INFO */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p><FaPhoneAlt className="icon" /> +1 (800) 555-1234</p>
          <p><FaEnvelope className="icon" /> support@newbalanceclone.com</p>
          <p><FaMapMarkerAlt className="icon" /> Boston, MA, United States</p>
          <p>Our support team is available 9am – 6pm (EST) Monday to Friday.</p>
        </div>

        {/* RIGHT SIDE - FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
          />

          <label>Message</label>
          <textarea
            name="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Type your message here..."
          />

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
