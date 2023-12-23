import { CommentOutlined, LikeFilled, LikeOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Drawer, Dropdown, Input } from 'antd';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react'
import { FaMapMarker } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/contextApi';
import { getComments, updateComments, updateLikes } from '../apiCalls/growthNetwork';
import TextArea from 'antd/es/input/TextArea';
import fbIcon from "../assets/facebook.png";
import networkingIcon from "../assets/networking.png";
import instagramIcon from "../assets/instagram.png";
import linkedInIcon from "../assets/linkedin.png";
import twitterIcon from "../assets/twitter.png";
import emailIcon from "../assets/email.png";
import { sendEmail } from "../apiCalls/sendMail";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";
import { itemsShare } from "../apiCalls/itemsShare";

const relativeTime = require('dayjs/plugin/relativeTime');
// Load the relativeTime plugin
function ExploreProductCard({ item }) {
    const [info, setInfo] = useState({ date: "" })
    const [itemState, setItemState] = useState({ likes: item.likes, liked: item.liked })
    const [readMore, setReadMore] = useState(false)
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([])
    const [textAreaValue,setTextAreaValue]=useState("")
    const navigate = useNavigate()

    const {
        user
    } = useContext(Context);
    const onCopyClick = async (productLink) => {
        try {
          await navigator.clipboard.writeText(productLink);
          toast.success("Link Copied", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } catch (err) {
          toast.success("Something Went wrong", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      };
    const items = [
        {
          key: "1",
          label: (
            <a rel="noopener noreferrer" href="#">
              <img
                className="social-media-img"
                src={fbIcon}
                height={25}
                width={25}
                alt="fb"
              ></img>
            </a>
          ),
        },

        {
          key: "3",
          label: (
            <a rel="noopener noreferrer" href='#' target="_blank">
              <img
                className="social-media-img"
                src={linkedInIcon}
                height={25}
                width={25}
                alt="linkedInIcon"
              ></img>
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <span
              
            >
              <FaCopy
                color="rgb(145 146 160)"
                style={{ width: 25, height: 25 }}
                onClick={()=>onCopyClick(`https://homelinked.tech/post/${item.post_id}`)}
              ></FaCopy>
            </span>
          ),
        },
       
        
      ];

    useEffect(() => {
        dayjs.extend(relativeTime);
        const date = dayjs(item.updated_on);
        const humanReadable = date.fromNow();
        setInfo({ date: humanReadable })
    }, [])
    const handleComment = async (post_id) => {
        setOpen(true)
        const { data } = await getComments({ post_id })
        setComments(data)
    }
    const handleCommentPost=async(content,post)=>{
        try {
            await updateComments({content,post})
            setTextAreaValue("")
        await handleComment(post)
        } catch (error) {
            
        }
        
    }
    const handleLike = async (post_id, like) => {
        try {

            const data = await updateLikes({ post_id, like })
            const { like_count, liked } = data.data
            setItemState((prevState) => ({ ...prevState, likes: like_count, liked }))


        } catch (error) {


        }
    }

    return (
        <div className="card py-1" style={{ width: "70%" }}>
            <Drawer width={"60%"} title={item.item_details.name} placement="left" onClose={() => {handleComment(item.post_id); setOpen(false) }} open={open}
                footer={[
                    <TextArea onChange={({target})=>setTextAreaValue(target.value)} value={textAreaValue} onKeyDown={({key,target})=>key=="Enter" && handleCommentPost(target.value,item.post_id)}/>
                ]}
            >
                {comments.map((comment) => {
                    return (<div className="comment bg-white mt-3 p-4 rounded-lg shadow">
                        <div className="comment-header flex justify-between items-center">
                           <div className='d-flex align-items-center'>
                            <Avatar style={{background:"blue"}} className='me-2'>{comment?.name.slice(0,1)}</Avatar>
                            <h3 className="text-lg font-semibold">{comment?.name}</h3>
                            </div> 
                            <small className="text-gray-500">{dayjs(comment?.added_on).format("DD,MMM,YYYY")}</small>
                        </div>
                        <p className="mt-2 " style={{wordBreak:"break-word"}}>{comment?.content}</p>
                        <div className="comment-actions mt-2">
                            <button
                                className="text-blue-500 hover:underline focus:outline-none"
                            // onClick={toggleReplies}
                            >

                            </button>
                        </div>


                    </div>)

                })}



            </Drawer>

            <div className="card-body p-4">
                <div className='d-flex align-items-center gap-2 jus'>

                    <Avatar style={{ background: "#076ec3" }}>
                        {item.item_details?.name.slice(0, 1)}
                    </Avatar>
                    <span>{item.item_details.name}</span>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <p className="card-title my-1 mt-2 font-bold" >{item.item_details.title}</p>
                    <Button onClick={() => { user ? navigate("/item/checkout", { state: item }) : navigate("/login") }}>Buy Now</Button>
                </div>
                <span className="card-text py-2 " style={{ whiteSpace: "pre-line" }}>{item.item_details.description.length > 200 && !readMore ? item.item_details.description.slice(0, 200) + "..." : item.item_details.description}</span>
                {item.item_details.description.length > 200 && <Button onClick={() => setReadMore(!readMore)} type='link'>{!readMore ? "Read more" : "Read less"}</Button>}
                <div className='flex justify-content-between align-items-center'>
                </div>
                <div className='d-flex mt-2 py-3'>
                    <img style={{ height: 250, objectFit: "contain" }} src={item.item_details.image} className="card-img-top" alt="img..." />
                    <img style={{ height: 250, width: 200 }} src={item.item_details.qr_code} className="card-img-top" alt="qrcode..." />
                </div>

            </div>
            {user &&
                <div>

                    <div className='d-flex py-2 justify-content-between px-5'>
                        <Badge count={itemState.likes} overflowCount={1000}>
                            <Button onClick={() => handleLike(item.post_id, itemState.liked == true ? 0 : 1)} type='link' className='d-flex '>{itemState.liked ? <LikeFilled style={{ fontSize: "18px" }} className='mt-2' /> : <LikeOutlined style={{ fontSize: "18px" }} className='mt-2' />} <p>Like</p></Button>
                        </Badge>
                        <Badge count={comments.length || item.total_comments} overflowCount={1000}>
                            <Button type='link' className='d-flex ' onClick={() => { handleComment(item.post_id) }}> <CommentOutlined style={{ fontSize: "18px" }} className='mt-2' /> <p>Comment</p></Button>
                        </Badge>
                        <Dropdown menu={{ items }} placement="bottomLeft" arrow>

                        <Button type='link' className='d-flex '> <ShareAltOutlined style={{ fontSize: "18px" }} className='mt-2' /> <p>Share</p></Button>
                            </Dropdown>

                    </div>
                </div>
            }

        </div>
    )
}

export default ExploreProductCard