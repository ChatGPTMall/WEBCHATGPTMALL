import axios from "axios";

const BaseUrl = "https://chatgptmall.tech/api/v1/";

export const getRoomHistory = async ({ roomId, roomKey }) => {
  const apiUrl = BaseUrl + "room/history/";
  const params = {
    room_id: roomId,
    room_key: roomKey,
  };
  try {
    const res = await axios.get(apiUrl, { params });
    if (res.status === 200) {
      return res.data.results;
    } else {
      new Error("something went wrong");
    }
  } catch (err) {
    new Error(err.message);
  }
};
