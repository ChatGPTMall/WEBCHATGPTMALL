import { Button, Form, Input } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateKey } from "../apiCalls/validateKey";
import { Context } from "../context/contextApi";
import { getRooms } from "../apiCalls/getRooms";
import { toast } from "react-toastify";

function CustomerSupport() {
  const params = useParams();
  const navigate = useNavigate();
  const { setIsValidKey, isValidKey, organization, loading, setLoading } =
    useContext(Context);
  const [validData, setValidData] = useState(false);
  const handleSubmitKey = async ({ key }) => {
    try {
      const payload = {
        roomKey: key,
        roomId: params.id,
      };
      const data = await validateKey("room/validate", payload);
      console.log('validate', data)
      if (data.status === 200) {
        localStorage.setItem("key",key)
        setIsValidKey(true);
      } else {
        setIsValidKey(false);
      }
    } catch (error) {
      toast.error("Plz Enter Valid Key");
      setIsValidKey(false);
    }
  };
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const { data } = await getRooms();

      setLoading(false);
      const foundRoom = data.some(
        (room) =>
          params.segment1.trim() === room.organization_name.trim() &&
          params.id.trim() === room.room_id.trim()
      );

      if (!foundRoom) {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="customer_support">
      <div className="h-text">
        <h2 className="mt-5">Welcome to Customer Support</h2>
        <p>Room {params.id}</p>
      </div>
      {!isValidKey ? (
        <Form
          className="d-flex align-items-center w-100 flex-column justify-content-center"
          onFinish={handleSubmitKey}
        >
          <Form.Item className="w-25" name="key">
            <Input placeholder="Enter key" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="mx-1 w-25 ">
            Submit
          </Button>
        </Form>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default CustomerSupport;
