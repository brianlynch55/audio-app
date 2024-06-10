import React, { useState } from "react";
import axios from "axios";

const GenerateSpeech = ({ summary, apiKey }) => {
  const [audioUrl, setAudioUrl] = useState("");

  const handleGenerateSpeech = async () => {
    try {
      const response = await axios.post(
        "/speak",
        { text: summary },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": `${apiKey}`,
          },
          responseType: "arraybuffer",
        }
      );

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error("Error generating speech:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGenerateSpeech}>Generate Speech</button>
      {audioUrl && (
        <div>
          <audio controls src={audioUrl}></audio>
          <a href={audioUrl} download="summary.mp3">
            Download
          </a>
        </div>
      )}
    </div>
  );
};

export default GenerateSpeech;
