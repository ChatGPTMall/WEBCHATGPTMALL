import { Button, Input } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

function CustomerSupport() {
  const params = useParams();

  return (
    <div className="customer_support">
      <div className="h-text">
        <h2 className="mt-5">Welcome to Customer Support</h2>
        <p>Room {params.id}</p>
      </div>
      <div className="d-flex align-items-center w-100 flex-column justify-content-center">
        <Input className="w-25" placeholder="Enter key" />
        <Button type="primary" className="mx-1 w-25 mt-2">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CustomerSupport;
