import React, { useState, useRef } from "react";
import axios from "axios";

const FileUpload = ({ setTranscript, apiKey }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": `${apiKey}`,
        },
      });
      setTranscript(response.data.text);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <p>Drag and drop a file here, or click to select a file</p>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <button onClick={() => fileInputRef.current.click()}>
          Select File
        </button>
      </div>
      {file && <p>Selected file: {file.name}</p>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
