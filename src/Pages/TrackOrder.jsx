import React, { useState } from "react";
import "../Css/TrackOrder.css";

const dummyOrder = {
  orderId: "123456789",
  email: "muthunambi.tech@gmail.com",
  status: "Shipped",
  estimatedDelivery: "Aug 10, 2025",
  items: [
    {
      name: "Sort Essentials Fleesce",
      price: 99.99,
      image: "/Cloths/lakb0004nwg_nb_30_i.webp",
      size: "M",
      quantity: 1,
      category: "Kids-Hoodie",
    },
    {
      name: "Sport Essentials Fleece Hoodie",
      price: 139.99,
      image: "/Cloths/lakg0003lir_nb_30_i.webp",
      size: "L",
      quantity: 1,
      category: "Kids Hoodie",
    },
    {
      name: "Kulutch Women's Full zip",
      price: 139.99,
      image: "/Cloths/lakg0004ahh_nb_70_i.webp",
      size: "S",
      quantity: 1,
      category: "Kids-Hoodie",
    },
    {
      name: "In Game Woven Track Jacket",
      price: 109.99,
      image: "/Cloths/mj51601yst_nb_70_i.webp",
      size: "XL",
      quantity: 1,
      category: "Mens-Jacket",
    },
    {
      name: "Sport Essentials Fleece Hoodie",
      price: 49.99,
      image: "/Cloths/mt41511dus_nb_70_i.webp",
      size: "XXL",
      quantity: 1,
      category: "Mens-Hoodie",
    },
    {
      name: "Shohei Signature Full Zip",
      price: 39.99,
      image: "/Cloths/mt51739oth_nb_50_i.webp",
      size: "M",
      quantity: 1,
      category: "Men's-Hoodie",
    },
    {
      name: "Fc Porto Match Jacket",
      price: 109.99,
      image: "/Cloths/wt41502ptf_nb_70_i.webp",
      size: "S",
      quantity: 1,
      category: "Womens-t-shirt",
    },
    {
      name: "klutch Women's Full Zip Hoodie",
      price: 149.99,
      image: "/Cloths/wt51501prc_nb_50_i.webp",
      size: "L",
      quantity: 1,
      category: "Womens-Hoodie",
    },
    {
      name: "Athletics T-shirt",
      price: 39.99,
      image: "/Cloths/wt51940wt_nb_50_i.webp",
      size: "M",
      quantity: 1,
      category: "Womens-Hoodie",
    },
  ],
};


const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [orderFound, setOrderFound] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();
    if (
      orderId.trim() === dummyOrder.orderId &&
      email.trim().toLowerCase() === dummyOrder.email
    ) {
      setOrderFound(true);
      setError("");
    } else {
      setOrderFound(false);
      setError("Order not found. Please check your Order ID or Email.");
    }
  };

  return (
    <div className="track-order-container">
      <h1>Track Your Order</h1>
      <form className="track-form" onSubmit={handleTrack}>
        <input
          type="text"
          placeholder="Order ID (e.g., NB123456789)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Track Order</button>
      </form>

      {error && <p className="error">{error}</p>}

      {orderFound && (
        <div className="order-details">
          <h2>Order Status: <span>{dummyOrder.status}</span></h2>
          <p><strong>Estimated Delivery:</strong> {dummyOrder.estimatedDelivery}</p>
          <h3>Items:</h3>
          <ul>
            {dummyOrder.items.map((item, index) => (
              <li key={index}>
                {item.name} ({item.color}) - Qty: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
