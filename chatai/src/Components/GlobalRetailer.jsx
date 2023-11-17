import React, { useEffect, useState } from "react";
import { getProducts, getTaoBaoProducts } from "../apiCalls/retailer";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Button, Input, Spin } from "antd";
import ProductCardTaoBao from "./ProductCardTaoBao";

function GlobalRetailer() {
  const { state } = useLocation();
  const [items, setItems] = useState({ results: [] });
  const [search, setSerach] = useState("tshirt");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const fetchProducts = async () => {
    try {
      setLoading(true);
      if (location.pathname.includes("taobao")) {
        await getTaoBaoProducts(search).then((res) => {
          setItems(res);
        });
      } else if (location.pathname.includes("handm")) {
        await getProducts(state.country, state.category).then((res) => {
          setItems(res);
        });
      } else {
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [location.pathname]);
  useEffect(() => {
    if (!state && location.pathname.includes("handm")) {
      navigate(-1);
    }
  }, [state]);

  return (
    <div className="p-5 overflow-scroll" style={{background:"#343541"}}>
      {loading ? (
        <div className="flex w-[100vw] h-[100vh] items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div className="d-flex flex-wrap  ">
          {location.pathname.includes("taobao") && (
            <div className="d-flex mx-4 my-3 w-75">
              {" "}
              <Input
                style={{ maxWidth: 400 }}
                value={search}
                onChange={(e) => {
                  setSerach(e.target.value);
                }}
              />{" "}
              <Button onClick={fetchProducts} className="mx-1 text-white">
                Search
              </Button>
            </div>
          )}
          <div className="flex flex-wrap gap-2 my-2 w-full justify-between  ">
            {items?.results?.map((item, index) => {
              return location.pathname.includes("taobao") ? (
                <ProductCardTaoBao
                  id={item?.num_iid}
                  key={index}
                  title={item?.title}
                  price={item?.price}
                  sales={item?.sales}
                  category={item?.category}
                  pic={item?.pic}
                />
              ) : (
                <ProductCard key={index} item={item} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default GlobalRetailer;
