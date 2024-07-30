import React, { useContext, useState } from "react";
import Layout from "../../Layout";
import "./payment.css";
import { DataContext } from "../../DataProvider";
import { axiosInstance } from "../../../Api/axios.js";
import ProductCard from "../../ProductCard.js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../CurrencyFormat.js";
import { ClipLoader } from "react-spinners";
import { db } from "../../../Utility/firebase.js";
import { useNavigate } from "react-router-dom";
import { Type } from "../../../Utility/actiontype.js";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = Array.isArray(basket)
    ? basket.reduce((amount, item) => item.price * item.amount + amount, 0)
    : 0;

  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);

      // Make sure `total` is defined and multiplied correctly for cents
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      // Get the client secret from the response
      const clientSecret = response.data?.clientSecret;
      if (!clientSecret) {
        throw new Error("Client secret not received from the server");
      }

      // Confirm the card payment using Stripe.js
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (!paymentIntent) {
        throw new Error("Payment intent not created");
      }

      // Store the order in the Firestore database
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        dispatch({type: Type.EMPTY_BASKET});

      navigate("/orders", { state: { msg: "You have placed new order" } });
      setProcessing(false);
    } catch (err) {
      console.error("Payment processing error:", err.message);
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="payment_header">Checkout ({totalItem}) items</div>
      <section className="payment">
        <div className="payment__add">
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        <div className="payment__add">
          <h3>Review items and delivery address</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        <div className="payment__add">
          <h3>Payment methods</h3>
          <div className="payment__card">
            <div className="payment__card_form">
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />
                <div className="payment__price">
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className="loading">
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ... </p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
