import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../apiCalls/appService";
import { Context } from "../context/contextApi"
import { getWechatListing } from "../apiCalls/getWechatListing";
import { Button, Progress, Table } from "antd";

const WechatListing = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const fetchWechatListing = async () => {
        try {
            const { data } = await getWechatListing()
            setData(data)
        } catch (error) {
            setData([] )
        }
    }
    useEffect(() => {
        fetchWechatListing()
    }, [])

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };


    return (
        <>
            <div className="flex flex-col usage-container w-full">
                <Header />
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Wechat Listing</h2>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {data.map((product) => (
                                <div 
                                key={product.id} 
                                className="group relative"
                                onClick={() => handleProductClick(product.item_id)}
                                >
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={product.image}
                                            alt={product.image}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                        <img
                                            src={product.qr_code}
                                            alt={product.qr_code}
                                            style={{
                                                background: "transparent",
                                                width: "90px", 
                                                height: "90px",
                                                position: "absolute",
                                                marginTop: "-90px"
                                            }}
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href="#">
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.title}
                                                </a>
                                            </h3>
                                            {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{product.price}$</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WechatListing
