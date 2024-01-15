import React from 'react'

export default function UserGuideStep({image,url,step,text}) {
    return (
        <div >
            <div className='my-2'>
                Step {step} : {url && <a target='_blank' href={url}>Click here</a>}
                {text}
            </div>
            <div>

                <img src={image} />
            </div>
        </div>
  )
}
