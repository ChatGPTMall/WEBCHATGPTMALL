import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/contextApi";
import SpinFC from "antd/es/spin";
import {
  Button,
  Checkbox,
  Dropdown,
  Image,
  Input,
  Modal,
  Select,
  Table,
} from "antd";
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
import emailIcon from "../assets/email.png";
import { sendEmail } from "../apiCalls/sendMail";
import { toast } from "react-toastify";

function ViewItems() {
  const [itemsData, setItemsData] = useState(undefined);
  const [search, setSearch] = useState(undefined);
  const [sort, setSort] = useState("name");
  const [loading, setLoading] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState("");
  const location = useLocation();
  const showModal = (title, id) => {
    setTitle(title);
    setProductId(id);
    setOpen(true);
  };

  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
      width: "230px",
      render: (image) => {
        return (
          <div
            className="d-flex justify-content-center p-2 "
            style={{
              border: "1px solid #076ec3",
              width: "100px",
              height: "80px",
              borderRadius: "10px",
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
      sorter: (a, b, value) => {
        if (value == "ascend") {
          setSort("name");
        } else {
          setSort("-name");
        }
      },
      defaultSortOrder: "ascend",
      width: "40%",
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
      render: ({ id, title,image,video }) => {
        const lHref=`https://www.linkedin.com/sharing/share-offsite/?url=http://skybrain.org/items/view/${id}`
        const items = [
          {
            key: "1",
            label: (
              <a rel="noopener noreferrer" href="#">
                <img
                  className="social-media-img"
                  src={fbIcon}
                  height={25}
                  width={25}
                  alt="fb"
                ></img>
              </a>
            ),
          },
          {
            key: "2",
            label: (
              <a rel="noopener noreferrer" href="#">
                <img
                  className="social-media-img"
                  src={instagramIcon}
                  height={25}
                  width={25}
                  alt="instagram"
                ></img>
              </a>
            ),
          },
          {
            key: "3",
            label: (
              <a
                rel="noopener noreferrer"
                href={lHref}
                target="_blank"
              >
                <img
                  className="social-media-img"
                  src={linkedInIcon}
                  height={25}
                  width={25}
                  alt="linkedInIcon"
                ></img>
              </a>
            ),
          },
          {
            key: "4",
            label: (
              <a rel="noopener noreferrer" href="#">
                <img
                  className="social-media-img"
                  src={twitterIcon}
                  height={25}
                  width={25}
                  alt="twitter"
                ></img>
              </a>
            ),
          },
          {
            key: "5",
            label: (
              <img
                onClick={() => {
                  showModal(title, id);
                }}
                className="social-media-img"
                src={emailIcon}
                height={25}
                width={25}
                alt="email"
              ></img>
            ),
          },
        ];
        return (
          <Dropdown menu={{ items }} placement="bottomLeft" arrow>
            <ShareAltOutlined
              className="share-icon"
              style={{ padding: "5px", fontSize: "18px" }}
            />
          </Dropdown>
        );
      },
    },
  ];

  const getItems = async () => {
    try {
      const roomKey = localStorage.getItem("room_key");
      const params = {
        search,
        roomKey,
        sort,
        isPrivate,
      };
      setLoading(true);
      const data = await getRoomItems("room/items", params);
      setItemsData(data);
      setLoading(false);
    } catch (error) {
      setItemsData([]);

      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = async () => {
    try {
      setLoading(true);
      const { data } = await sendEmail({ item_id: productId, email });
      toast.success(data.msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setEmail("");
      setOpen(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
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
    }
  };
  useEffect(() => {
    getItems();
  }, [search, sort, isPrivate]);
  return (
    <div className="view-items ">
      <>
        <div className="d-flex justify-content-between align-items-center">
          {/* email model */}
          <Modal
            title={
              <h5>
                Share
                <span className="mx-3" style={{ color: "gold" }}>
                  {title}
                </span>
              </h5>
            }
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <Input
              className="my-3"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder=" Add Email"
            />
          </Modal>

          <Input
            style={{ width: "250px" }}
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <Checkbox
            onChange={(e) => {
              setIsPrivate(e.target.checked);
            }}
            checked={isPrivate}
            style={{ color: "white", marginInline: "10px" }}
          >
            Show Private
          </Checkbox>
        </div>
        <hr className="my-4" />

        <Table
          pagination={false}
          scroll={{ x: 300 }}
          columns={columns}
          dataSource={itemsData}
          loading={loading}
        />
      </>
    </div>
  );
}

export default ViewItems;
