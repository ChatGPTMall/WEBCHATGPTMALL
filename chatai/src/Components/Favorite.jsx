import { HeartFilled } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

function Favorite({ data, handleHeartClick}) {
  
  return (
    <div className="my-2">
      <div className="inner">
        {}
        <div className="user_input position-relative p-2">
          {data.user_input}

          <span className="position-absolute" style={{ right: 10 }}><Button onClick={()=>handleHeartClick(data.id)}  type="link d-flex p-0 m-0"><HeartFilled></HeartFilled></Button> </span>
        </div>
        <div className="response position-relative p-2">{data.response}</div>
      </div>
    </div>
  );
}

export default Favorite;
