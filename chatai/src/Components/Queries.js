import { Button, Modal, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { sendReply } from "../apiCalls/sendReply";
import { toast } from "react-toastify";


function Queries({
  user_input,
  response,
  cs_response,
  id,
  has_replied,
  admin,
  updateData
}) {
  const [modelOpen, setModelOpen] = useState(false);
  const [textArea, setTextArea] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleTextAreaOnChange = (e) => {
    setTextArea(e.target.value);
  };

  const handleReplyClick = async () => {
    try {
      setLoading(true);
      const res = await sendReply({ reply: textArea, query_id: id });
      await updateData()
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setModelOpen(false);
  };
  useEffect(() => {
    console.log(textArea);
  }, [textArea]);
  return (
    <div className="w-100 query_container my-2">
      <Modal
        // bodyStyle={{background:"red"}}
        centered
        closable={false}
        open={modelOpen}
        okText="Reply"
        onOk={handleReplyClick}
        onCancel={() => {
          setModelOpen(false);
        }}
        width={"50%"}
      >
        {loading ? (
          <Spin />
        ) : (
          <TextArea
            onChange={handleTextAreaOnChange}
            value={textArea}
          ></TextArea>
        )}
      </Modal>
      <div className="inner">
        {}
        <div className="user_input position-relative p-2">
          {user_input}{" "}
          {admin && (
            <span className="position-absolute" style={{ right: 10 }}>
              {has_replied ? (
                <span style={{ color: "#1dcc1b" }}>REPLIED</span>
              ) : (
                <span style={{ color: "#e01b53" }}>NOT REPLIED</span>
              )}
            </span>
          )}
        </div>
        <div className="response position-relative p-2">
          {response}{" "}
          {!has_replied && (
            <Button
              onClick={() => {
                setModelOpen(true);
              }}
              type="LINK"
              style={{
                zIndex: 100,
                color: "#1be01b",
                position: "absolute",
                right: 0,
                bottom: 0,
              }}
            >
              Reply
            </Button>
          )}
        </div>
      </div>
      {has_replied && (
        <>
          <div className=" cs_response p-2">{cs_response}</div>
        </>
      )}
    </div>
  );
}

export default Queries;
