import React, { useContext, useEffect } from "react";
import { Context } from "../context/contextApi";

import { getRoomHistory } from "../apiCalls/getRoomHistory";
import { FaCopy,  FaUser } from "react-icons/fa";
import TextToSpeech from "./TextToSpeech";
import { toast } from "react-toastify";
function MyRoomHistory() {
  const {
    active,
    loading,
    setLoading,
    generateUniqueId,

    room_id,
    room_key,
    roomHistory,
    setRoomHistory
  } = useContext(Context);
  
  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
    }
  };
  const getHistory = async () => {
    setLoading(true);
    const data = await getRoomHistory({
        roomId:room_id,
        roomKey:room_key
    });
    setRoomHistory(data);
    setLoading(false);
  };

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <>
    
    {!loading && roomHistory?.map((chat)=>{
        return(
            <div
            key={generateUniqueId()}
            className="response c_response d-flex flex-column text-white"
          >
            <div className="input">
              {!loading && (
                <div
                  className={`user-query d-flex align-items-center gap-4 py-2 ${
                    active ? "active" : ""
                  }`}
                >
                  <span className="ps-3">
                    <FaUser></FaUser>
                  </span>
                  <span className="response-input" style={{ fontSize: "1rem" }}>
                    {chat.user_input}
                  </span>
                </div>
              )}
            </div>
            <div className="response-text d-flex py-3 gap-4">
              <span className="ps-3" style={{ fontSize: "1.5rem" }}>
                {/* {"my input" && <FaRobot></FaRobot>} */}
              </span>
              <p>{chat.response}</p>
              <span className="speaker">
                <TextToSpeech text={chat.response}></TextToSpeech>
              </span>
              <span
                onClick={() => {
                  copyContent(chat.response);
                  toast.success("Copied to clipboard", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                }}
                className="copy"
              >
                <FaCopy color="rgb(145 146 160)"></FaCopy>
              </span>
            </div>
          </div>
            )
        })}
   
        </>
  );
}

export default MyRoomHistory;
