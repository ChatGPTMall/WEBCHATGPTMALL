import React, { useEffect, useState } from "react";
import { Pannellum } from "pannellum-react";
import { Button, Input, Select } from "antd";
import { get360Category, get360Image, get360ImageId } from "../apiCalls/threeSixty";
import {DownloadOutlined} from "@ant-design/icons"
import defaultImage from "../assets/default.jpg"
import { downloadImage } from "../helper/downloadImg";
function ThreeSixtyView() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [cat360, setCat360] = useState([]);
  const [prompt,setPrompt]=useState("")
  const [id,setId]=useState(5)

  const fetch360Categories = async () => {
    try {
      setLoading(true);
      const res = await get360Category();
      setCat360(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);

    }
  };
  const handleGenerate = async () => {
    const details = await get360ImageId(id,prompt);
    const getImg=(url)=>{
      setLoading(false)
      setImage(url)
    }
    await get360Image(details,getImg)
    setLoading(true)
   
  };
  useEffect(() => {
    fetch360Categories();
  }, []);
  return (
    <div className="three_sixty_view w-100 d-flex justify-content-center p-0 m-0 position-relative">
      <Pannellum
        width="100%"
        className="position-relative"
        height="100%"
        image={
          image?image:defaultImage
        }
        pitch={10}
        autoRotate={5}
        yaw={180}
        hfov={110}
        autoLoad
        showZoomCtrl={false}
      >
        <Pannellum.Hotspot
          type="custom"
          pitch={12.41}
          yaw={117.76}
          // handleClick={(evt, name) => console.log(name)}
          name="image info"
        />
      </Pannellum>
      <div
        className="input-box p-5 position-absolute w-75 d-flex  three_sixty_input_div"
        style={{ bottom: 1, borderRadius: 5 }}
      >
      { image && <span className="position-absolute" onClick={()=>{downloadImage(image)}} style={{right:20,top:10}}><DownloadOutlined/></span>}
        <Input
          style={{
            borderBottom: "1px solid white",
            borderRadius: 0,
            width: "100%",
          }}
          onChange={(e)=>{setPrompt(e.target.value)}}
          value={prompt}
          bordered={false}
          placeholder="Snow Mountains"
        />
        <Select
          className="mx-1"
          defaultValue={"Realistic"}
          options={cat360}
          onChange={(value)=>{setId(value)}}
          style={{ width: "170px" }}
        />
        <Button loading={loading} className="mx-1" type="primary" onClick={handleGenerate}>
          GENERATE
        </Button>
      </div>
    </div>
  );
}

export default ThreeSixtyView;
