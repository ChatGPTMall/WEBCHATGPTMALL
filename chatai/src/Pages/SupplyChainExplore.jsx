import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'

function SupplyChainExplore() {
    return (

        <div className='w-100'>

            <Header />
            <div className='d-flex h-[90vh] w-100 justify-content-center align-items-center'>
                <h2>SupplyChainExplore</h2><Link  className='mx-1 text-primaryBlue' to={"/supplychain/explore"}>Explore More</Link></div>

        </div>
    )
}

export default SupplyChainExplore