import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import { Button } from "antd";

function WechatProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate=useNavigate()

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://chatgptmall.tech/api/v1/products/${id}`); // Replace with your API endpoint
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow bg-gray-100 py-10">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex flex-col lg:flex-row">
                            <div className="flex-shrink-0">
                                <img
                                    className="w-full lg:w-96 rounded-lg shadow-lg"
                                    src={product.image}
                                    alt={product.title}
                                />
                            </div>
                            <div className="mt-6 lg:mt-0 lg:ml-10 flex flex-col justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                                    <p className="mt-4 text-gray-700">{product.description}</p>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                                    <Button onClick={() => {navigate("/item/checkout", { state: {item_details:product} })}}>Buy Now</Button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 lg:flex lg:space-x-10">
                            <div className="lg:w-1/2">
                                <img
                                    src={product.qr_code}
                                    alt="QR Code"
                                    className="w-32 h-32 mx-auto lg:mx-0 lg:w-48 lg:h-48 rounded-lg shadow-md"
                                />
                            </div>
                            <div className="mt-6 lg:mt-0 lg:w-1/2">
                                <video
                                    className="w-full rounded-lg shadow-md"
                                    controls
                                >
                                    <source src={product.video_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WechatProductDetail