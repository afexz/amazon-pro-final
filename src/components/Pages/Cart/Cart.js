import React, { useContext } from "react";
import Layout from "../../Layout";
import { DataContext } from "../../DataProvider";
import ProductCard from "../../ProductCard";
import CurrencyFormat from "../../CurrencyFormat";
import { Link } from "react-router-dom";
import "./cart.css"; // Import the CSS file
import { Type } from "../../../Utility/actiontype";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = Array.isArray(basket) ? basket.reduce((amount, item) => item.price * item.amount + amount, 0) : 0;

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <Layout>
      <section className="cart-container">
        <div className="cart-header">
          <h2>Hello</h2>
          <h3>Your Shopping Cart</h3>
          <hr />
        </div>
        <div className="cart-items">
          {basket?.length === 0 ? (
            <p className="cart-empty">No item in your cart</p>
          ) : (
            basket?.map((item, i) => (
              <section className="cart_product">
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  flex={true}
                  renderAdd={false}
                />
                <div className="btn_container">
                  <button onClick={() => increment(item)}>+</button>
                  <span>{item.amount}</span>
                  <button onClick={() => decrement(item.id)}>-</button>
                </div>
              </section>
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className="cart-summary">
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <div className="gift-option">
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </div>
            <Link to="/payments" className="checkout-link">
              Continue to Checkout
            </Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
