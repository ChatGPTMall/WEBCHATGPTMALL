import axios from "axios";
import Pusher from "pusher-js";
const apiKey = "tYcH74TemOn0LMrSJzXCrJ1Qv45MAbSd7bGYelqBnRN4F6DUeL1Z1PhvZ0y6";
export const get360Category = async () => {
  const url = "https://backend.blockadelabs.com/api/v1/skybox/styles";
  try {
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data.map((cat) => {
      return { label: cat.name, value: cat.id };
    });
  } catch (error) {
    console.error(error);
  }
};
export const get360ImageId = async (catid, prompt) => {
  const url =
    "https://backend.blockadelabs.com/api/v1/skybox?api_key=tYcH74TemOn0LMrSJzXCrJ1Qv45MAbSd7bGYelqBnRN4F6DUeL1Z1PhvZ0y6";
  try {
    const response = await axios.post(url, {
      skybox_style_id: catid,
      prompt,
    });
    const { pusher_channel, obfuscated_id, pusher_event } = response.data;
    return { pusher_channel, obfuscated_id, pusher_event };
  } catch (error) {
    console.error(error);
  }
};
export const get360Image = async ({
  pusher_channel,
  obfuscated_id,
  pusher_event,
},sendImg) => {
  // const app_id = "1555452";
  const key = "a6a7b7662238ce4494d5";
  const cluster = "mt1";
  initiateGeneration(obfuscated_id)
  

  async function initiateGeneration(id) {
    const params = {
      api_key:apiKey
    };
    const generationEndpoint = `https://backend.blockadelabs.com/api/v1/imagine/requests/obfuscated-id/${id}`;
    try {
       await axios.get(generationEndpoint, {params});
    } catch (error) {
      console.error("Error:", error);
    }
  }
  function processGenerationResponse(data) {
    
    console.log("Generation Status:", data.status);
    if (data.status === "complete") {
      sendImg(data.file_url)
    
    }
  }
  const pusher = new Pusher(key, {
    cluster,
  });

  const channel = pusher.subscribe(pusher_channel);
  channel.bind(pusher_event, (data) => {
    // Process the status update data
  processGenerationResponse(data);
  });

  

};
