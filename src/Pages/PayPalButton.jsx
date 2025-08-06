import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = () => {
  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_SANDBOX_CLIENT_ID" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: "10.00" }  // You can pass dynamic cart total
            }]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            alert(`Transaction completed by ${details.payer.name.given_name}`);
            console.log(details);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
