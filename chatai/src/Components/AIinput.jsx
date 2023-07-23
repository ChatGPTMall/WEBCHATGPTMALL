import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { WebcamCapture } from "./WebcamCapture";
import { CameraFilled, UploadOutlined } from "@ant-design/icons";
import { uploadImage } from "../apiCalls/aiinputs";
import { useNavigate } from "react-router-dom";

function AIinput() {
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const objectUrl = () => {
    return URL.createObjectURL(imageSrc);
  };
  const handleUpload = async () => {
    if (imageSrc) {
      try {
        setLoading(true)
        const formData = new FormData();
        formData.append("image", imageSrc);
        const res = await uploadImage(formData);
        setLoading(false)
        navigate("response", { state: res });
      } catch (error) {
        setLoading(false)
      }
    }
  };

  useEffect(() => {
    handleUpload();
  }, [imageSrc]);
  return (
    <div className="ai_input_container d-flex flex-column justify-content-center align-items-center">
      <div className="position-relative">
        {imageSrc && (
          <img
            className="my-2"
            src={objectUrl(imageSrc)}
            height={310}
            width={310}
            loading={loading}
          ></img>
        )}
        {loading && <span className="position-absolute" style={{top:15 ,right:100,color:"black"}} >Please Wait...</span>}
      </div>
      <WebcamCapture
        isOpen={cameraOpen}
        setCameraOpen={setCameraOpen}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
      />

      <Upload
        name="aiimage"
        listType="picture"
        accept="image/*"
        showUploadList={false}
        multiple={false}
        className="my-2"
        onChange={(e) => {
          setImageSrc(e.file);
        }}
        beforeUpload={() => false}
      >
        <Button type="primary" style={{ width: 310 }} icon={<UploadOutlined />}>
          Upload Image
        </Button>
      </Upload>
      <Button
        className="my-2"
        type="primary"
        style={{ width: 310 }}
        icon={<CameraFilled />}
        onClick={() => {
          setCameraOpen(true);
        }}
      >
        Open Camera
      </Button>
    </div>
  );
}

export default AIinput;
