import axios from "axios";

export const getRooms = async () => {
    try {
      const res = await axios.get(
        "https://chatgptmall.tech/api/v1/organization/rooms/"
      );
      return res
      
    } catch (err) {
      console.log(err);
    }
  };