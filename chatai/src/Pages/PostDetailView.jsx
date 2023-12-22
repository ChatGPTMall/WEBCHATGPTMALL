import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { getPostDetails } from '../apiCalls/growthNetwork'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

function PostDetailView() {
    const [product, setProduct] = useState({})
    const params = useParams()
    const fetchPost = async () => {
        const { data } = await getPostDetails({ post_id: params.id })
        setProduct(data.item_details)
    }
    useEffect(() => {
        fetchPost()
    }, [])
    return (
        <div className='w-100'>
            <Header />
            <div className='container-fluid my-3'>


                <div className="w-75  mx-auto w-full bg-white rounded-md overflow-hidden shadow-md">
                    <div className='d-flex gap-2'>
                        <div className='w-100'>

                            <img
                                src={product?.image}
                                alt={product?.title}
                                className="w-100 mb-3 me-2 object-center"
                            />
                            <video className='w-100' controls>
                                <source src={product.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                        </div>
                        <div className='w-100'>
                            <img
                                src={product?.qr_code}
                                alt={product?.title}
                                className="w-100  h-100  object-center"
                            />
                        </div>
                    </div>
                    <div className="p-4">
                        <h2 className="text-2xl font-bold text-gray-800">{product?.title}</h2>
                        <p className="text-gray-600 mb-4">{product?.description}</p>
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-xl text-gray-700">${product?.price?.toFixed(2)}</p>
                            <p className="text-gray-700">{product?.location}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-700">Stock: {product?.stock}</p>
                            <p className="text-gray-700">Last Updated: {dayjs(product?.updated_on).format("DD,MMM,YY")}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default PostDetailView