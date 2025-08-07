import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Cart.css";
import { useStore } from "../Contaxt/Store";
import { Link } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
  const navigate = useNavigate();

  const { cartItems, setCartItems } = useStore();

  const updateQuantity = (index, delta) => {
    const updated = [...cartItems];

    // Decrease or increase quantity
    updated[index].quantity = Math.max(1, updated[index].quantity + delta);

    setCartItems(updated); // 🔁 update context
    localStorage.setItem("cartItems", JSON.stringify(updated)); // ✅ sync
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated); // 🔁 update context
    localStorage.setItem("cartItems", JSON.stringify(updated)); // ✅ sync
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>My Cart</h2>
        <p>There are no items in your cart.</p>
        <button onClick={() => navigate("/")} className="continue-btn">
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-left">
        <h2>My Cart</h2>
        {cartItems.map((item, index) => (
          <div className="cart-item" key={`${item.id}-${index}`}>
            <img src={item.images[0]} alt={item.name} className="cart-img" />
            <div className="cart-details">
              <h3>{item.name}</h3>
              <p>Size: {item.selectedSize}</p>

              <div className="quantity-row">
                <span>Qty</span>
                <button onClick={() => updateQuantity(index, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(index, 1)}>+</button>
              </div>

              <div className="shipping-options">
                <button>Shipping</button>
                <button>Store pickup</button>
              </div>

              <p className="excluded-text">Excluded from promotions</p>
            </div>
            <div className="price-remove">
              <p className="price-cart">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button className="remove-btn" onClick={() => removeItem(index)}>
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>

        <div className="promo-line">
          <span>Redeem Promo Code</span>
          <span>+</span>
        </div>

        <div className="summary-line">
          <span>Sub Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-line">
          <span>Shipping: Standard</span>
          <span>FREE</span>
        </div>
        <div className="summary-line">
          <span>Sales tax</span>
          <span>Calculated at checkout</span>
        </div>

        <div className="summary-total">
          <span>Order Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <p className="installments">
          4 payments of ${(subtotal / 4).toFixed(2)} at 0% interest with Klarna
          or Afterpay
        </p>

        {/* Mobile-Fixed Checkout Buttons */}
        <div className="fixed-checkout">
          <Link to="/Checkout">
            <button className="checkout-btn">Checkout</button>
          </Link>

          <div className="paypal-btn-wrapper">
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
                  navigate("/order-success");
                });
              }}
              onError={(err) => {
                console.error("PayPal Checkout Error:", err);
                alert("Something went wrong with PayPal Checkout.");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
