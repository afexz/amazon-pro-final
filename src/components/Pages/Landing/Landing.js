import React from "react";
import Catagory from "../../Catagory.js"; 
import Product from "../../Product.js";
import Layout from "../../Layout.js";
import CarouselImage from "../../Carousel.js"; 

function Landingpage() {
  return (
    <Layout>
      <CarouselImage />
      <Catagory />
      <Product />
    </Layout>
  );
}

export default Landingpage;
