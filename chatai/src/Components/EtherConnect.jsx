import { Button, Input, Table } from "antd";
import React, { useState } from "react";
import { getEtherBalance, getEtherDetail } from "../apiCalls/etherConnect";
import { toast } from "react-toastify";
import { weiToEther } from "../helper/weiToEther";

function EtherConnect() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [etherDetails, setEtherDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Block Number",
      dataIndex: "blockNumber",
      key: "blockNumber",
    },
    {
      title: "Timestamp",
      dataIndex: "timeStamp",
      key: "timeStamp",
    },
    {
      title: "Gas",
      dataIndex: "gas",
      key: "gas",
    },
    {
      title: "Gas Price",
      dataIndex: "gasPrice",
      key: "gasPrice",
    },
    {
      title: "Gas Used",
      dataIndex: "gasUsed",
      key: "gasUsed",
    },
  ];
  const handleFetchClick = async () => {
    try {
      if (account.length < 1) {
        toast.error("Plz Enter Address", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      setLoading(true);
      const { data } = await getEtherBalance(account);
      const details = await getEtherDetail(account);
      console.log(details);
      setEtherDetails(details);
      if (data.result[0].balance) {
        setAmount(data.result[0].balance);
      } else {
        toast.error(data.result, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="ether-connect-container p-5">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex w-50">
          <Input
            className="w-100"
            placeholder="Enter address"
            value={account}
            onChange={(e) => {
              setAccount(e.target.value);
            }}
          />
          <span className="mx-3"></span>
          <Button loading={loading} onClick={handleFetchClick} type="primary">
            Fetch Balance
          </Button>
        </div>
        <div>
          {amount && (
            <>
              Balance:{" "}
              <strong style={{ color: "#76f035" }}>{weiToEther(amount)}</strong>
            </>
          )}
        </div>
      </div>
      {amount && (
        <div className="mt-5 p-3 ">
          <h3 className="mx-2">Transitions</h3>

          <Table
            columns={columns}
            pagination={{ pageSize: 10 }}
            // loading={loading}
            dataSource={etherDetails}
            //   onRow={rowProps}
          />
        </div>
      )}
    </div>
  );
}

export default EtherConnect;
