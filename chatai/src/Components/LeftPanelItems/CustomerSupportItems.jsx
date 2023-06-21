import { Button, Modal, Spin } from "antd";
import React, { useState } from "react";
import MyRoomHistory from "../MyRoomHistory";
import { getRoomQueries } from "../../apiCalls/getRoomQueries";
import Queries from "../Queries";

function CustomerSupportItems() {
  const [modelOpen, setModelOpen] = useState(false);
  const [modelOpen2, setModelOpen2] = useState(false);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleQueriesClick = async () => {
    try {
      setModelOpen2(true);
      setLoading(true);
      const key = localStorage.getItem("key");
      const data = await getRoomQueries(key);
      setQueries(data);
      setLoading(false);
    } catch (error) {}
  };
  return (
    <div>
      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        onClick={() => setModelOpen(true)}
        style={{ color: "white", textAlign: "left" }}
      >
        Room History
      </Button>
      <Modal
        // bodyStyle={{background:"red"}}
        title={<h5 className="my-3 pb-3 text-center"> Room History</h5>}
        centered
        closable={false}
        open={modelOpen}
        footer={[]}
        width={"50%"}
      >
        <MyRoomHistory />
        <Button
          style={{ position: "sticky", bottom: 0 }}
          onClick={() => {
            setModelOpen(false);
          }}
        >
          Close
        </Button>
      </Modal>
      <Button
        className="mx-3 w-auto d-flex align-items-center"
        type="link"
        onClick={handleQueriesClick}
        style={{ color: "white", textAlign: "left" }}
      >
        Room Queries
      </Button>
      <Modal
        // bodyStyle={{background:"red"}}
        title={<h5 className="my-3 pb-3 text-center"> Room Queries</h5>}
        centered
        closable={false}
        open={modelOpen2}
        footer={[]}
        width={"50%"}
      >
        <div className="queries_container ">
          {loading && <Spin />}
          {!loading &&
            queries.map((query) => {
              return <Queries key={query.id} {...query} admin={true} updateData={handleQueriesClick} />;
            })}
        </div>

        <Button
          style={{ position: "sticky", bottom: 0, marginTop: "100px" }}
          onClick={() => {
            setModelOpen2(false);
          }}
        >
          Close
        </Button>
      </Modal>
    </div>
  );
}

export default CustomerSupportItems;
