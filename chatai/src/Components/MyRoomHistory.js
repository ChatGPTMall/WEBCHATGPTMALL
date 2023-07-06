import React, { useContext, useEffect } from "react";
import { Context } from "../context/contextApi";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { getRoomHistory } from "../apiCalls/getRoomHistory";
import { FaCopy, FaShare, FaUser } from "react-icons/fa";
import TextToSpeech from "./TextToSpeech";
import { toast } from "react-toastify";
import { Button, Dropdown } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { addFavourites } from "../apiCalls/favourites";
function MyRoomHistory({getShareItems}) {
  
  const params = useParams();
  const navigate = useNavigate();
  const {
    active,
    loading,
    setLoading,
    generateUniqueId,

    room_id,
    room_key,
    roomHistory,
    setRoomHistory,
  } = useContext(Context);

  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {}
  };
  const getHistory = async () => {
    try {
      setLoading(true);
      const data = await getRoomHistory({
        roomId: params.id,
        roomKey: room_key,
      });
      setRoomHistory(data);
      setLoading(false);
    } catch (error) {
      localStorage.clear();

      navigate("/");
    }
  };
  useEffect(() => {
    getHistory();
  }, []);
  const handleHeartClick = async (data) => {
    try {
      // setLoading(true);
      await addFavourites({
        ...data,
        room_key: localStorage.getItem("room_key"),
      });
      const mHistory = roomHistory.map((chat) => {
        if (chat.id == data.history) {
          toast.success("Successfully added to Favourites", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return { ...chat, is_favourite: true };
        } else {
          return chat;
        }
       
      });

      setRoomHistory(mHistory)
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
    }
  };
  return (
    <>
      {!loading &&
        roomHistory?.map((chat) => {
          return (
            <div
              key={generateUniqueId()}
              className="response c_response d-flex flex-column mt-5 text-white"
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
                    <span
                      className="response-input"
                      style={{ fontSize: "1rem" }}
                    >
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
                <Button
                  type="link"
                  className="heart p-0"
                  onClick={() =>
                    handleHeartClick({
                      user_input: chat.user_input,
                      response: chat.response,
                      history: chat.id,
                    })
                  }
                >
                  {chat.is_favourite ? <HeartFilled /> : <HeartOutlined />}
                </Button>
                <Dropdown menu={{items:getShareItems(chat.id)}} placement="bottomLeft" arrow>
                <Button
                  type="link"
                  className="share p-0"
                  onClick={()=>{}
                  }
                >
                  {<FaShare/>}
                </Button>
                </Dropdown>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default MyRoomHistory;
