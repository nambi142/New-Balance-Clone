import React, { useState, useEffect } from "react";
import "../Css/Checkout.css";
import { useStore } from "../Contaxt/Store";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom"; // Already imported in Cart.jsx, add here if missing

const Checkout = () => {
  const { cartItems, userInfo } = useStore();
  const { setCartItems } = useStore(); 
  const navigate = useNavigate(); 

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (userInfo) {
      setForm({
        firstName: userInfo.firstname || "",
        lastName: userInfo.lastname || "",
        address: userInfo.address || "",
        phone: userInfo.phone || "",
        email: userInfo.email || "",
      });
    }
  }, [userInfo]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear the cart
    setCartItems([]);
    localStorage.removeItem("cartItems");

    alert("Order placed successfully!");
    navigate("/OrderSuccess"); // Redirect after placing order
  };

  const openAddressForm = (isEditing) => {
    setEditingAddress(isEditing);
    setShowAddressForm(true);
  };

  const closeAddressForm = () => {
    setShowAddressForm(false);
  };

  const handleSaveAddress = () => {
    // In real app, save to DB or global state
    setShowAddressForm(false);
  };

  return (
    <div className="checkout-container">
      {/* LEFT SIDE */}
      <form className="shipping-form" onSubmit={handleSubmit}>
        <h2>Shipping address</h2>

        <div className="user-box">
          <div>
            <h4>
              {form.firstName} {form.lastName}
            </h4>
            <p>{form.address}</p>
          </div>
        </div>

        <div className="change-links">
          <span onClick={() => openAddressForm(true)}>Update address</span> |{" "}
          <span onClick={() => openAddressForm(false)}>Add new address</span>
        </div>

        <input
          name="email"
          placeholder="Email *"
          value={form.email}
          type="email"
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <div className="payment-method">
          <h4>Payment Method</h4>

          <button type="submit" className="checkout-btn">
            Cash on Delivery
          </button>

          <div className="paypal-btn">
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: subtotal.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(
                    `Transaction completed by ${details.payer.name.given_name}`
                  );
                  console.log("Payment details:", details);
                  navigate("/order-success"); // You can redirect here
                });
              }}
              onError={(err) => {
                console.error("PayPal Checkout Error:", err);
                alert("Something went wrong with PayPal Checkout.");
              }}
            />
          </div>
        </div>
      </form>

      {/* RIGHT SIDE */}
      <div className="summary-section">
        <h3>Order Summary</h3>
        <div className="summary-line">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-line">
          <span>Shipping: Standard</span>
          <span>FREE</span>
        </div>
        <div className="summary-line">
          <span>Total Tax</span>
          <span>$5.60</span>
        </div>
        <div className="summary-total">
          <strong>Order Total</strong>
          <strong>${(subtotal + 5.6).toFixed(2)}</strong>
        </div>

        <p className="installments">
          4 payments of ${(subtotal / 4).toFixed(2)} at 0% interest with Klarna
          or Afterpay
        </p>

        <div className="checkout-items">
          {cartItems.map((item, i) => (
            <div key={i} className="checkout-item">
              <img src={item.images[0]} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>Color: {item.color || "Default"}</p>
                <p>Size: {item.selectedSize}</p>
                <p>Qty: {item.quantity}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADDRESS FORM MODAL */}
      {showAddressForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingAddress ? "Update Address" : "Add New Address"}</h3>

            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              type="email"
              onChange={handleChange}
              required
            />

            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSaveAddress}>
                Save
              </button>
              <button className="cancel-btn" onClick={closeAddressForm}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
