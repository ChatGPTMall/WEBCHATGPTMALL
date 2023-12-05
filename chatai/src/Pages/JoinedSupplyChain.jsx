import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Context } from '../context/contextApi';
import { useNavigate } from 'react-router-dom';
import { joinedSupplyChain, supplyChainWithAuth } from '../apiCalls/supplyChain';
import SupplyChainCard from '../Components/SupplyChainCard';
import Search from 'antd/es/transfer/search';
import { Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
function JoinedSupplyChain() {
    const {
        user,
        get_User
    } = useContext(Context);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [supplyChain, setSupplyChain] = useState([])
    const [supplyChainCopy, setSupplyChainCopy] = useState([])
    const [search, setSearch] = useState("")

    const fetchSupplyChain = async () => {
        try {
            const { data } = await joinedSupplyChain()
            setSupplyChain(data)
            setSupplyChainCopy(data)

            setLoading(false)
        } catch (error) {
            setLoading(false)

        }

    }
    useEffect(() => {
        if (user) {
            fetchSupplyChain()
        }
        else if (!localStorage.getItem("token")) {
            navigate("/login")
        }
    }, [user])
    useEffect(() => {
        const regex = new RegExp(search, "i");
        setSupplyChainCopy(
            supplyChain?.filter(({ name }) => {
                return name ? regex.test(name) : false;
            })
        );

    }, [search])



    return (
        <div className='w-100 chain'>
            <Header />
            <div className=' container d-flex justify-content-center px-4 pt-5'>
                <div className='w-50 position-relative'>

                    <input className='w-100 px-4 py-2' style={{ height: 50, fontSize: 22, borderRadius: 20, border: "2px solid #076ec3" }} placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
                    <SearchOutlined className='position-absolute' style={{ top: 18, right: 20 }} />
                </div>
            </div>
            <div className='d-flex container gap-3 p-3 flex-wrap justify-content-between'>

                {loading
                    ? <div className=' w-100 py-5 d-flex justify-content-center'><Spin /></div> : supplyChainCopy.map(({ community_id, name, logo, total_members, has_joined }, index) => {
                        return logo && <SupplyChainCard title={name} id={community_id} image={logo} members={total_members} has_joined={has_joined} index={index}/>
                    })}
            </div>

        </div>
    )
}

export default JoinedSupplyChain