import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Components/Header'
import CustomSearch from '../../Components/CustomSearch'
import ChatbotCard from './components/ChatbotCard'
import { getChatBotList } from './data'
import { Context } from '../../context/contextApi'
import { useNavigate } from 'react-router-dom'

function ChatBots() {
  const [search, setSearch] = useState("")
  const [chatBotList,setChatBotList]=useState([])
  const navigate=useNavigate()
  const [chatBotListCopy,setChatBotListCopy]=useState([])
  const {
    user,
    

  } = useContext(Context);
  const fetchChatBots=async()=>{
    try {
      const {data}=await getChatBotList()
      setChatBotList((prevState)=>([...prevState,...data]))
      setChatBotListCopy((prevState)=>([...prevState,...data]))
  
    } catch (error) {
      
    }
   

  }
  useEffect(()=>{
    fetchChatBots()
    if(!user){
      navigate("/")
    }
  },[user])
  useEffect(() => {
    const regex = new RegExp(search, "i");
    setChatBotListCopy(
        chatBotList?.filter(({ title }) => {
            return title ? regex.test(title) : false;
        })
    );
}, [search])
  return (
    <div className='w-100'>
      <Header />
      <div className='container-fluid'>
        <div className='d-flex align-items-center pt-4 justify-content-center '>

          <CustomSearch placeholder="ChatBots" setSearch={setSearch} value={search} />
        </div>
        <div className='d-flex flex-wrap justify-content-center   pt-5' >
          <ChatbotCard/>
          {
            chatBotListCopy.map((item)=>{
              return <ChatbotCard title={item.title} description={item.description} updatedOn={item.updated_at} type={item.type?item.type:"show"}/>
            })
          }
        </div>
      </div>

    </div>
  )
}

export default ChatBots