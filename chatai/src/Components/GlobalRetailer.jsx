import React, { useEffect, useState } from "react";
import { getProducts } from "../apiCalls/retailer";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Spin } from "antd";

function GlobalRetailer() {
  const { state } = useLocation();
  const [items,setItems]=useState([])
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()
  const fetchProducts = async () => {
    try {
        const products = await getProducts(state.country, state.category);
    setItems(products)
    setLoading(false)
    } catch (error) {
        setLoading(false)
    }
    
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(()=>{
if(!state){
    navigate(-1)
}
  },[state])

  return (

    <div className="global-retailer-container overflow-scroll">
     {loading?<div className="d-flex align-items-center justify-content-center"><Spin></Spin></div>: <div className="d-flex flex-wrap  ">
        {items?.results?.map((item,index) => {
         return <ProductCard key={index} item={item} />;
        })}
      </div>}
    </div>
  );
}

export default GlobalRetailer;
