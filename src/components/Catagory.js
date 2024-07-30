import React, { useEffect, useState } from "react";
import "./catagory.css"
import productImage from "./topproducts";

function Catagory() {
  const [products, setProducts] = useState([]);
// https: useEffect(() => {
//   fetch("topproducts")
//     .then((response) => response.json())
//     .then((data) => {
//       const mappedData = data.map((product) => ({
//         title: product.title,
//         image: product.image,
//         price: product.price,
//       }));
//       setProducts(mappedData);
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// }, []);

  return (
    <div className="container__wrapper">
      {productImage.map((product, index) => (
        <div key={index} className="container">
          <a href="#">
            <h2 className="title">{product.title}</h2>
            <img src={product.image} alt={product.title} className="image" />
            <p className="price">Shop now</p>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Catagory;
