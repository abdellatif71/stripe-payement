import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import './App.css';


//  öffentliche Stripe-Schlüssel
                                        const stripePromise = loadStripe("pk_test_51PPqM72NFk6kVo0EKlR0Ln5j6h0qaCLa66Ap56A9Gx6wFxRNcs6H56nQfohzLqFhIAZdBkDgetU6UXA9E2SbtYME00xO8kpQpP");

export default function HandlePayment() {
  const handlePayment = async () => {
    const productName = "LAVAZZA-EXPERT Gusto Pieno Bohnen -6x1 kg"; // Produktname
    const productPrice = 2099; // Preis in Cent (20.00 €)

    //  CheckoutSession mit deinem Backend
    const response = await fetch("http://localhost:3001/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productName, productPrice }),
    });

    if (!response.ok) {
      console.error("Fehler beim Erstellen der Checkout-Sitzung:", response.statusText);
      return;
    }

    const session = await response.json();

    //  Stripe-Checkout-Seite weiter
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  //  Button
  const containerStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };
  const h1Style = {
    color: "blue",
    fontSize: "3rem",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      
    <h1 style={h1Style}>Kaufen</h1>
      <button onClick={handlePayment}>Jetzt kaufen</button>
    </div>
  );
}
