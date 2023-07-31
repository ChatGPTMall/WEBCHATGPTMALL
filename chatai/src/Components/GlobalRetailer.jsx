import React, { useEffect, useState } from "react";
import { getProducts, getTaoBaoProducts } from "../apiCalls/retailer";
import { useLocation, useNavigate } from "react-router-dom";



import ProductCard from "./ProductCard";
import { Button, Input, Spin } from "antd";
import ProductCardTaoBao from "./ProductCardTaoBao";

function GlobalRetailer() {
  const { state } = useLocation();
  const [items, setItems] = useState([]);
  const [search,setSerach]=useState("shoes")
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location=useLocation()
  const fetchProducts = async () => {
    try {
      setLoading(true)
      if (location.pathname.includes("taobao")) {

        const products = await getTaoBaoProducts(search);
        setItems(products);
        console.log(products)
      } else if (location.pathname.includes("handm")) {
        const products = await getProducts(state.country, state.category);
        setItems(products);
      } else {
        // navigate(-1);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (!state && location.pathname.includes("handm")) {
      navigate(-1);
    }
  }, [state]);

  return (
    <div className="global-retailer-container overflow-scroll">
      {loading ? (
        <div className="d-flex align-items-center justify-content-center">
          <Spin></Spin>
        </div>
      ) : (
        <div className="d-flex flex-wrap  ">
          {location.pathname.includes("taobao") && <div className="d-flex mx-4 my-3 w-75"> <Input  style={{maxWidth:400}} value={search} onChange={(e)=>{setSerach(e.target.value)}}/> <Button onClick={fetchProducts} className="mx-1">Search</Button></div>}
         <div className="d-flex flex-wrap  ">

          {items?.results?.map((item, index) => {
            return location.pathname.includes("taobao")?
            <ProductCardTaoBao key={index} item={item}/>: <ProductCard key={index} item={item} />;
          })}
        </div>
          </div>
      )}
    </div>
  );
}

export default GlobalRetailer;
