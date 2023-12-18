import { CommentOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react'
import { FaMapMarker } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/contextApi';

const relativeTime = require('dayjs/plugin/relativeTime');
// Load the relativeTime plugin
function ExploreProductCard({ item }) {
    const [info, setInfo] = useState({ date: "" })
    const [readMore,setReadMore]=useState(false)
    const navigate=useNavigate()
    const {
        user
      } = useContext(Context);

    useEffect(() => {
        dayjs.extend(relativeTime);
        const date = dayjs(item.updated_on);
        const humanReadable = date.fromNow();
        setInfo({ date: humanReadable })
    }, [])

    return (
        <div className="card py-1" style={{ width: "70%" }}>

            <div className="card-body p-4">
                <div className='d-flex align-items-center gap-2 jus'>

                    <Avatar style={{ background: "#076ec3" }}>
                        {item.item_details?.name.slice(0, 1)}
                    </Avatar>
                    <span>{item.item_details.name}</span>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className="card-title my-1 mt-2 font-bold" >{item.item_details.title}</p>
                    <Button onClick={()=>{user?navigate("/item/checkout",{state:item}):navigate("/login")}}>Buy Now</Button>
                </div>
                <span className="card-text py-2 " style={{whiteSpace:"pre-line"}}>{item.item_details.description.length>200 && !readMore?item.item_details.description.slice(0,200)+"...":item.item_details.description}</span>
                {item.item_details.description.length>200 && <Button onClick={()=>setReadMore(!readMore)} type='link'>{!readMore?"Read more":"Read less"}</Button>}
                <div className='flex justify-content-between align-items-center'>
                </div>
                <div className='d-flex mt-2 py-3'>
                    <img style={{ height: 250, objectFit: "contain" }} src={item.item_details.image} className="card-img-top" alt="img..." />
                    <img style={{ height: 250, width: 200 }} src={item.item_details.qr_code} className="card-img-top" alt="qrcode..." />
                </div>

            </div>
            <div className='d-flex py-2 justify-content-between px-5'>
                <Button type='link' className='d-flex '><LikeOutlined  style={{fontSize:"18px"}}className='mt-2' /> <p>Like</p></Button>
                <Button type='link' className='d-flex '> <CommentOutlined style={{fontSize:"18px"}} className='mt-2' /> <p>Comment</p></Button>
                <Button type='link' className='d-flex '> <ShareAltOutlined style={{fontSize:"18px"}} className='mt-2' /> <p>Share</p></Button>

            </div>

        </div>
    )
}

export default ExploreProductCard