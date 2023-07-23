import React, { useRef, useCallback, useState } from "react";
import { Modal, Button } from "antd";
import Webcam from "react-webcam";

export const WebcamCapture = ({
  isOpen,
  imageSrc,
  setImageSrc,
  setCameraOpen,
}) => {
  const webcamRef = useRef(null);
  function base64ToFile(base64String, fileName, mimeType) {
    // Convert base64 image to Blob
    const base64Index = base64String.indexOf(";base64,") + ";base64,".length;
    const rawBinary = window.atob(base64String.slice(base64Index));
    const array = new Uint8Array(rawBinary.length);
    for (let i = 0; i < rawBinary.length; i++) {
      array[i] = rawBinary.charCodeAt(i);
    }
    const blob = new Blob([array], { type: mimeType || "image/jpeg" });

    // Create a File object from the Blob
    return new File([blob], fileName || "image.jpg", {
      type: mimeType || "image/jpeg",
    });
  }

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64String = imageSrc; // Your base64-encoded image string
    const fileName = "image.jpg"; // Optional: Customize the filename
    const mimeType = "image/jpeg"; // Optional: Specify the MIME type
    const file = base64ToFile(base64String, fileName, mimeType);
    setImageSrc(file);
  }, []);
  const onRequestClose = () => {
    setCameraOpen(false);
    // const tracks = webcamRef.current.stream.getTracks();
    // tracks.forEach((track) => track.stop());
  };
  const handleCapture = () => {
    capturePhoto();
    // onCapture(imageSrc);
    onRequestClose();
  };

  return (
    <Modal
      title="Capture Photo"
      open={isOpen}
      style={{ width: "90vh" }}
      onCancel={onRequestClose}
      footer={[
        <Button key="cancel" onClick={onRequestClose}>
          Cancel
        </Button>,
        <Button key="capture" type="primary" onClick={handleCapture}>
          Capture
        </Button>,
      ]}
    >
      <Webcam
        width={"100%"}
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
    </Modal>
  );
};
