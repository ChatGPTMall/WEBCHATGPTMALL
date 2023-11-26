import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/contextApi";
import { detailHistory } from "../apiCalls/detailHistory";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { HeartFilled } from "@ant-design/icons";

function MessageDetailView() {
  const params = useParams();
  const [data, setData] = useState();
  const { loading, setLoading } = useContext(Context);
  const fetchMessageDetails = async () => {
    try {
      setLoading(true);
      const res = await detailHistory(params.history_id);
      setData(res.data);
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchMessageDetails();
  }, []);
  return (
    <div className="message-detail-view">
      {loading ? (
        <Spin></Spin>
      ) : (
        <div
          className="d-flex align-items-center flex-column justify-content-center "
          style={{
            padding: "20px",
            height: 600,
            borderRadius: 20,
            color: "white",
          }}
        >
          <div className="w-md-100 w-75 p-3 d-flex justify-content-between  my-2" style={{background:"#121111",borderRadius:"10PX"}}>
           <span>
             <img src={data?.image} style={{marginBottom: "23px"}} />
             {data?.user_input}
            </span>
            <span className="mx-2">
               { data?.is_favourite?<HeartFilled/>:""}
            </span>
            </div>
          <div className="w-md-100 w-75 p-3 my-2" style={{background:"#2e2c2b",borderRadius:"10PX"}}>{data?.response}</div>
        </div>
      )}
    </div>
  );
}

export default MessageDetailView;
