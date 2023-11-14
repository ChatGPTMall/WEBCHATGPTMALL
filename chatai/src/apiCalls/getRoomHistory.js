import axios from "axios";

const BaseUrl = "https://chatgptmall.tech/api/v1/";


export const getRoomHistory = async ({ roomId, roomKey }) => {
  const apiUrl = BaseUrl + "room/history/";
  const config = {
    params: {
      room_id: roomId,
      room_key: roomKey,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const res = await axios.get(apiUrl, config);
    if (res.status === 200) {
      console.log("inside axios")
      console.log(res.data);
      return res.data.results;
    } else {
      new Error("something went wrong");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
