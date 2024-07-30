import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './components/Pages/Auth/Signup.js'
import Payment from './components/Pages/Payment/Payment.js'
import Orders from './components/Pages/Orders/Orders.js'
import Cart from './components/Pages/Cart/Cart.js'
import Landingpage from './components/Pages/Landing/Landing.js';
import Productdetail from './components/Pages/ProductDetail/Productdetail.js';
import Product from './components/Product.js';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRout from './components/ProtectedRout.js';

const stripePromise = loadStripe(
  "pk_test_51Pi34aRxixBNobMqDZasi0ucswUCRTPR03Fx1rLnNrn28uyDAMNmIyEJpydVugfbwqmeFkhtpPOSDZHdo1XdOdRd00bIm6Ajyp"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/auth" element={<Signup />} />
        <Route
          path="/payments"
          element={
            <ProtectedRout
              msg={"You must login to proceed for payment"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRout>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRout
              msg={"You must login to access your order"}
              redirect={"/orders"}>
              <Orders />
            </ProtectedRout>
          }
        />
        <Route path="/products/:productId" element={<Productdetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing
