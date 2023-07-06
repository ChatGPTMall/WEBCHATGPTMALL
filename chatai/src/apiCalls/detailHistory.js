import axios from "axios";

export const detailHistory = async (history_id) => {
    try {
      const res = await axios.get(
        "https://chatgptmall.tech/api/v1/room/history/detail/",{params:{
            history_id
        }}
      );
      return res
      
    } catch (err) {
      console.log(err);
    }
  };