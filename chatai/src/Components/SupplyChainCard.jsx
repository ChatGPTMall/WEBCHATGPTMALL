import { UsergroupAddOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/contextApi';
import { JoinSupplyChain } from '../apiCalls/supplyChain';
import { toast } from 'react-toastify';
function SupplyChainCard({ id, image, title, members, joined,has_joined ,page}) {
    const navigate=useNavigate()
    const [afterJoin,setAfterJoin]=useState({id:""})
    const [totalMembers,setTotalMembers]=useState(members)
    const {
        user
      } = useContext(Context);
      const join=async()=>{
        try {
            if(user){

               const {data}= await JoinSupplyChain(id)
               setAfterJoin({id})
               setTotalMembers((prevState)=>prevState+1)
               toast.success(data.msg);
            }
            else{
                navigate("/login")
            }
        } catch (error) {
            toast.error("something went wrong");

            
        }
      }
    return (
        <div className="card m-1" style={{ width: "18rem", }}>
            <img className="card-img-top" src={image} alt="Card image cap" style={{minHeight:200}} />
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-text">{title?.length > 60 ? title.slice(0, 60) + "..." : title}</h5>
                <div className='pt-3 d-flex justify-content-between align-items-center'>
                   {user && has_joined || afterJoin.id==id?<Button style={{background:"#076ec3"}} type='primary' onClick={()=>{user?navigate(`/supplychain/${id}`):navigate("/login")}}>Explore</Button>: <Button type='primary' style={{background:"#076ec3"}} onClick={()=>{join(id)}}>Join Now</Button>}
                    <span>
                        <UsergroupAddOutlined style={{fontSize:30}}/>
                        <span className='font-Poppins  text-md mx-1 w-full font-medium text-primaryBlue'>
                        {afterJoin.id==id?totalMembers:members}

                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SupplyChainCard
SupplyChainCard.defaultProps={
    has_joined:false
}