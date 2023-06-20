import axios from "axios";



export const getRoomQueries = async (roomKey) => {
  const apiUrl = "https://chatgptmall.tech/api/v1/room/CS/queries/"
  const params = {
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
    throw new Error(err.message);
  }
};
