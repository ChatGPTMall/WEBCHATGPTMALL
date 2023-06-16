import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/contextApi";
import SpinFC from "antd/es/spin";
import { Dropdown, Image, Input, Table } from "antd";
import { useLocation } from "react-router-dom";
import { getRoomItems } from "../apiCalls/getItems";
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  ShareAltOutlined,
} from "@ant-design/icons";
import fbIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import linkedInIcon from "../assets/linkedin.png";
import twitterIcon from "../assets/twitter.png";

function ViewItems() {
  const items = [
    {
      key: "1",
      label: (
        <a
        
          rel="noopener noreferrer"
          href="#"
        >
          <img className="social-media-img"
          src={fbIcon} height={40} width={40} alt="fb"></img>
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          
          rel="noopener noreferrer"
          href="#"
        >
          <img className="social-media-img"
          src={instagramIcon} height={40} width={40} alt="instagram"></img>
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          
          rel="noopener noreferrer"
          href="#"
        >
          <img
            className="social-media-img"
            src={linkedInIcon}
            height={40}
            width={40}
            alt="linkedInIcon"
          ></img>
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          rel="noopener noreferrer"
          href="#"
        >
          <img className="social-media-img"
          src={twitterIcon} height={40} width={40} alt="twitter"></img>
        </a>
      ),
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      width:"230px"
      ,
      render: (image) => {
        return (
          <div
            className="d-flex justify-content-center p-2 "
            style={{
              border: "1px solid #076ec3",
              width: "200px",
              height: "150px",
              background: "white",
            }}
          >
            <Image
              preview={true}
              width={"100%"}
              height={"100%"}
              src={image}
              fallback="data:image/png;base64,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"
            />
          </div>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      className: "text-center",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      className: "text-center",
      key: "price",
    },
    {
      title: "Category",
      className: "text-center",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      className: "text-center",
      render: () => (
        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <ShareAltOutlined
            className="share-icon"
            style={{ background: "#076ec3", padding: "5px", fontSize: "25px" }}
          />
        </Dropdown>
      ),
    },
  ];
  const [itemsData, setItemsData] = useState(undefined);
  const [itemsDataCopy, setItemsDataCopy] = useState(undefined);

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const getItems = async () => {
    try {
      const roomId = location.pathname.split("/")[2];
      setLoading(true);
      const data = await getRoomItems("room/items", roomId);
      setItemsData(data);
      setItemsDataCopy(data);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setItemsData([])
      setItemsDataCopy([]);
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    const filterData = itemsData.filter(({ title }) => {
      return title.includes(e.target.value);
    });
    setItemsDataCopy(filterData);
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="view-items">
      <h5
        className="text-center my-3"
        style={{ color: "white", fontSize: "1.5rem" }}
      >
        Items In Room
      </h5>
        <>
          <Input
            style={{ width: "50%" }}
            placeholder="Search"
            onChange={handleSearch}
          />
          <hr className="my-1" />

          <Table
            pagination={{ pageSize: 5 }}
            scroll={{ x:700,y: 500  }}
            columns={columns}
            dataSource={itemsDataCopy}
            loading={loading}
          />
        </>
      
    </div>
  );
}

export default ViewItems;
