import { Button } from 'antd'
import React from 'react'

function ChatBotIntegrateCard({ icon, title,onSetupClick }) {
  return (
    <div class="max-w-sm  bg-white  rounded overflow-hidden shadow-lg" style={{ minWidth: 300 }}>


      <div class="flex items-center justify-center mt-5">
        <img style={{ height: 70, width: 70 }} src={icon} alt="" />
      </div>


      <div class="p-6">
        <div class="font-bold text-xl text-center mb-2">{title}</div>
      </div>


      <div class="p-6 flex justify-end">
        <Button onClick={onSetupClick} class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Setup
        </Button>
      </div>

    </div>
  )
}

export default ChatBotIntegrateCard