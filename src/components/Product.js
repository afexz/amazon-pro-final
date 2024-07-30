import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./product.css";
import Loder from "./Loder";

function Product() {
  const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        loading(false)
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loder />
      ) : (
        <div className="product_wrapper">
          {products.map((singleProduct) => {
            return (
              <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
            );
          })}
        </div>
      )}
    </>
  );
}

export default Product;
