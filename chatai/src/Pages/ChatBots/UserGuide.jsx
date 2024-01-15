import React from 'react'
import Header from '../../Components/Header'
import { Timeline } from 'antd'
import step1 from "../../assets/chatbotuserguide/step1.jpeg"
import step2 from "../../assets/chatbotuserguide/step2.jpeg"
import step3 from "../../assets/chatbotuserguide/step3.jpeg"
import step4 from "../../assets/chatbotuserguide/step4.png"
import step5 from "../../assets/chatbotuserguide/step5.png"
import step6 from "../../assets/chatbotuserguide/step6.png"
import step7 from "../../assets/chatbotuserguide/step7.png"
import step8 from "../../assets/chatbotuserguide/step8.png"
import step9 from "../../assets/chatbotuserguide/step9.png"
import step10 from "../../assets/chatbotuserguide/step10.png"
import step11 from "../../assets/chatbotuserguide/step11.png"






import UserGuideStep from './components/UserGuideStep'

function UserGuide() {
    return (
        <div className='w-100'>
            <Header></Header>
            <div className='container chatbot-user-guide'>
                <h2 className="text-4xl my-5 text-center font-bold">How To Create Whatsapp Bussiness Account</h2>
                <div className='my-5'>

                    <Timeline
                        items={[
                            {
                                children: <UserGuideStep url="https://developers.facebook.com/apps/" image={step1} step={1} text={<span> and then click on <strong> Get Started</strong></span>}></UserGuideStep>
                            },
                            {
                                children: <UserGuideStep image={step2} step={2} text={<span>Register yourself as Meta developer as mentioned below</span>}></UserGuideStep>
                            },
                            {
                                children: <UserGuideStep image={step3} step={3} text={<span>After registration successfull click on <strong>Create App</strong></span>}></UserGuideStep>
                            },
                            {
                                children: <UserGuideStep image={step4} step={4} text={<span>Click on <strong> Other</strong> option and then <strong> Next</strong> </span>}></UserGuideStep>
                            },
                            {
                                children: <UserGuideStep image={step5} step={5} text={<span>Select option <strong> Bussiness</strong>  </span>}></UserGuideStep>
                            }, {
                                children: <UserGuideStep image={step6} step={6} text={<span>Enter your details </span>}></UserGuideStep>
                            }, {
                                children: <UserGuideStep image={step7} step={7} text={<span>You will see the interface like this, scrolldown  </span>}></UserGuideStep>
                            }, {
                                children: <UserGuideStep image={step8} step={8} text={<span>Click  <strong>Setup</strong> </span>}></UserGuideStep>
                            }, {
                                children: <UserGuideStep image={step9} step={9} text={<span>Click <strong>Continue</strong> </span>}></UserGuideStep>
                            },
                            {
                                children: <UserGuideStep image={step10} step={10} text={<span>Click on <strong>Start using the API</strong> </span>}></UserGuideStep>
                            },
                            {
                                children: <UserGuideStep image={step11} step={11} text={<span>Here on this page you will get <strong>App ID , Phone number ID , Phone number </strong> </span>}></UserGuideStep>
                            },

                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserGuide