import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Upload,
  Input,
  Typography,
  message,
  Select,
} from "antd";
import { CameraFilled, UploadOutlined } from "@ant-design/icons";
import { WebcamCapture } from "./WebcamCapture";
import { uploadImage, OCRCreateItemAPI } from "../apiCalls/aiinputs";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

function AIInput() {
  // State
  const [cameraOpen, setCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [input, setinput] = useState("");
  const [loading, setLoading] = useState(false);

  // AI response
  const [aiResponse, setAiResponse] = useState(null);

  // Additional fields after AI response is ready
  const [price, setPrice] = useState("");

  const [description, setDescription] = useState("");

  const previewUrl = imageSrc ? URL.createObjectURL(imageSrc) : null;

  /**
   * handleUpload
   * Builds the form data and calls `uploadImage` with image + user text.
   */
  const handleUpload = async () => {
    if (!imageSrc) {
      message.warning("Please upload or capture an image first.");
      return;
    }
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", imageSrc);
      formData.append("input", input);

      // Call your API
      const response = await uploadImage(formData);

      // Store AI response
      setAiResponse(response);
    } catch (error) {
      console.error(error);
      message.error("Failed to upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Once we have an AI response, we can auto-populate our description field.
   */
  useEffect(() => {
    if (aiResponse) {
      if (typeof aiResponse === "string") {
        setDescription(aiResponse);
      } else {
        // Convert object to string if needed
        setDescription(JSON.stringify(aiResponse, null, 2));
      }
    }
  }, [aiResponse]);

  /**
   * handleCreateItem
   */
  const handleCreateItem = async () => {
    try {
      setLoading(true);
      // Convert price to integer if needed
      const parsedPrice = parseInt(price, 10) || 0;
  
      const formData = new FormData();
      formData.append("file", imageSrc);
      formData.append("title", input);
      formData.append("price", parsedPrice);
      formData.append("description", description);
  
      const result = await OCRCreateItemAPI(formData); 
      console.log(result)
      if (result) {
        message.success("Item created successfully!");
  
        // RESET all the states here
        setCameraOpen(false);
        setImageSrc(null);
        setinput("");
        setAiResponse(null);
        setPrice("");
        setDescription("");
      } else {
        message.error("Failed to create item.");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      message.error("Error creating item. Please try again.");
    }
  };

  return (
    <Card
      style={{
        width: "95%",
        maxWidth: 600,
        margin: "40px auto",
      }}
    >
      <Row gutter={[16, 16]} justify="center">
        <Col span={24}>
          <Title level={3} style={{ textAlign: "center", marginBottom: 0 }}>
            AI Input
          </Title>
        </Col>

        {/* Image Preview (if any) */}
        <Col span={24} style={{ textAlign: "center" }}>
          {previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              style={{ maxWidth: "100%", height: "auto", marginBottom: 16 }}
            />
          )}
        </Col>

        {/* WebcamCapture (shown/hidden based on cameraOpen) */}
        <Col span={24}>
          <WebcamCapture
            isOpen={cameraOpen}
            setCameraOpen={setCameraOpen}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          />
        </Col>

        {/* Upload Button */}
        <Col span={24} style={{ textAlign: "center" }}>
          <Upload
            name="aiimage"
            listType="picture-card"
            showUploadList={false}
            accept="image/*"
            beforeUpload={() => false} // prevent auto-upload
            onChange={(info) => {
              setImageSrc(info.file);
            }}
          >
            {imageSrc ? (
              <img
                src={previewUrl}
                alt="selected"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Click or Drag to Upload</div>
              </div>
            )}
          </Upload>
        </Col>

        {/* Camera Button */}
        <Col span={24} style={{ textAlign: "center" }}>
          <Button
            icon={<CameraFilled />}
            onClick={() => setCameraOpen(true)}
            style={{ marginTop: 8 }}
          >
            Open Camera
          </Button>
        </Col>

        {/* Text Input */}
        <Col span={24}>
          <TextArea
            rows={3}
            placeholder="Enter your query or caption here..."
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
        </Col>

        {/* Submit Button */}
        <Col span={24} style={{ textAlign: "center" }}>
          <Button onClick={handleUpload} loading={loading} style={{ marginTop: 8 }}>
            Submit
          </Button>
        </Col>

        {/* Show AI Response + Additional Fields + Create Item Button */}
        {aiResponse && (
          <Col span={24} style={{ marginTop: 24 }}>
            <Paragraph strong style={{ whiteSpace: "pre-wrap" }}>
              {/* Display AI response (raw or JSON) */}
              {typeof aiResponse === "object"
                ? JSON.stringify(aiResponse, null, 2)
                : aiResponse}
            </Paragraph>

            {/* Additional Fields: Price, Description */}
            <div style={{ marginTop: 16 }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Price</Text>
                  <Input
                    required={true}
                    style={{ marginTop: 4 }}
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Col>

                <Col span={24}>
                  <Text strong>Description</Text>
                  <TextArea
                    style={{ marginTop: 4 }}
                    rows={3}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Row>
            </div>

            <div style={{ textAlign: "center", marginTop: 16 }}>
              <Button loading={loading} onClick={handleCreateItem}>Create Item</Button>
            </div>
          </Col>
        )}
      </Row>
    </Card>
  );
}

export default AIInput;