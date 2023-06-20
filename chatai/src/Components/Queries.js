import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

function Queries({ user_input, response, cs_response, id, has_replied }) {
  const [modelOpen, setModelOpen] = useState(false);

   const handleReplyClick=()=>{
setModelOpen(true)
    }
  return (
    <div className="w-100 query_container my-2">
        <Modal
        // bodyStyle={{background:"red"}}
        centered
        closable={false}
        open={modelOpen}
        okText="Reply"
        onOk={()=>{setModelOpen(false)}}
        onCancel={()=>{setModelOpen(false)}}
        width={"50%"}
      >
       <TextArea></TextArea>
        
      </Modal>
      <div className="inner">
        <div className="user_input position-relative p-2">
          {user_input}{" "}
          <span className="position-absolute" style={{ right: 10 }}>
            {has_replied ? (
              <span style={{ color: "#1dcc1b" }}>REPLIED</span>
            ) : (
              <span style={{ color: "#e01b53" }}>NOT REPLIED</span>
            )}
          </span>
        </div>
        <div className="response position-relative p-2">
          {response}{" "}
          <Button
          onClick={handleReplyClick}
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
        </div>
      </div>
      {has_replied && (
        <div className=" cs_response p-2">{cs_response}</div>
      )}
    </div>
  );
}

export default Queries;
