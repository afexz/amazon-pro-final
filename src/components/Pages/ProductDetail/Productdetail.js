import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { useParams } from "react-router-dom";
import { producturl } from "../../../Api/endPoints";
import ProductCard from "../../ProductCard";
import axios from "axios";
import Loder from "../../Loder";

function ProductDetail() {
  const { productId } = useParams();
  const [loading, setLoading]= useState(false)
  const [product, setProduct] = useState({});

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${producturl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  }, [productId]);

  return (
    <Layout>
      {loading?(<Loder/>):( <ProductCard product={product} flex={true} renderDesc ={true} renderAdd={true}/> )}
    </Layout>
  );
}

export default ProductDetail;
