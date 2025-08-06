// Pages/OrderSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../Css/OrderSuccess.css";
import { FaCheckCircle } from "react-icons/fa"; // ✅ react-icons

const OrderSuccess = () => {
  return (
    <div className="order-success-page">
      <div className="success-box">
        <FaCheckCircle size={64} color="#4caf50" className="check-icon" />
        <h2>Thank you for your purchase!</h2>
        <p>Your order was placed successfully.</p>
        <Link to="/">
          <button className="success-btn">Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
