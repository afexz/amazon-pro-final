import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "./CurrencyFormat";
import "./product.css";
import { Link } from "react-router-dom";
import { DataContext } from "./DataProvider";
import { Type } from "../Utility/actiontype";

function ProductCard({ product, flex, renderDesc, renderAdd}) {
  // Changed to product
  const { image, title, id, rating = { rate: 0, count: 0 }, price, description } = product;

  const [state, dispatch]= useContext(DataContext)

  const addToCart = ()=>{
    dispatch({
      type:Type.ADD_TO_BASKET,
      item:{
        image, title, id, rating, price, description 
      }
    })
  }

  return (
    <div className={`card__container ${flex ? "product__flexed" : ""}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div className="descript"> {description}</div>}
        <div className="rating">
          <Rating value={rating.rate} precision={0.1} readOnly />
          <small>{rating.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className="button" onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
