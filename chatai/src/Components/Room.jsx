/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/contextApi";
import { toast } from "react-toastify";

export default function Room() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  const {
    setRoom_Id,
    room_key,
    room_id,
    setRoom_Key,
    setRoom_Organization,
    getRoomCustomer,
  } = useContext(Context);

  useEffect(() => {
    // const { segment1, id } = params;
    // setRoom_Organization(segment1);
    // setRoom_Id(id);
    // localStorage.setItem("room_organization", segment1);
    // localStorage.setItem("room_id", id);

    if (rooms.length === 0) {
      setIsLoading(true);
      const fetchRooms = async () => {
        try {
          const res = await axios.get(
            "https://chatgptmall.tech/api/v1/organization/rooms/"
          );
          setRooms(res.data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchRooms();
    } else {
      setIsLoading(false);
      // const foundRoom = rooms.some(
        // (room) =>
          // segment1.trim() === room.organization_name.trim() &&
          // id.trim() === room.room_id.trim()
      // );
        // console.log(foundRoom, "foundRoom")
      // if (foundRoom) {
      // } else {
        // navigate("/");
      // }
    }
  }, [params, navigate]);

  const callCustomerApi = async () => {
    if (room_key == null || room_key?.length === 0) {
      toast.error("Please enter room key");
      return;
    }
    await getRoomCustomer(room_id, room_key);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    < >
      <div className="room" style={{backgrounColor:"red !important"}}>
        <div className="form gap-2 d-flex flex-column">
          <h2 style={{color:"white"}}>Welcome to Homelinked</h2>
          <input
            type="text"
            className="form-control rounded-0"
            style={{
              fontSize: "15px",
              padding: "22px 15px"
            }}
            placeholder="Enter Home Name"
            // value={room_id}
            onChange={(event) => {
              setRoom_Id(event.target.value);
            }}
          />
          <input
            type="text"
            className="form-control rounded-0"
            style={{
              fontSize: "15px",
              padding: "22px 15px"
            }}
            placeholder="Enter Home Key"
            // value={room_key}
            onChange={(event) => {
              setRoom_Key(event.target.value);
            }}
          />
          <button
            onClick={callCustomerApi}
            className="btn btn-sm border-0 rounded-0 btn-primary"
            style={{
              height: "46px"
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
