import React from 'react'
import Header from '../../Components/Header'
import { Timeline } from 'antd'
import UserGuideStep from './components/UserGuideStep'
import step1 from "../../assets/stripe/stripe1.png"
import step2 from "../../assets/stripe/stripe2.png"



export default function StripeDocs() {
    return (
        <div className='w-100'>
            <Header />
            <div className='container  chatbot-user-guide'>
                <h1  className="text-4xl my-5 text-center font-bold">How To Create Stripe Private/Public Key</h1>
                <div className='my-5'>

                    <Timeline
                        items={[
                            {
                                children: <UserGuideStep url="https://dashboard.stripe.com/dashboard" image={step1} step={1} text={<span> Click on <strong> Developers</strong></span>}></UserGuideStep>
                            },
                            {
                                children: <UserGuideStep image={step2} step={2} text={<span>  Click on <strong> Api keys</strong> and then you will get private and public keys </span>}></UserGuideStep>
                            },
                        ]}
                    />
                </div>
            </div>

        </div>
    )
}
