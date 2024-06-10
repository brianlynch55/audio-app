import React, { useState } from "react";
import axios from "axios";

const Summarize = ({ transcript, apiKey, setSummary, useCache }) => {
  const [summary, setSummaryState] = useState("");

  const handleSummarize = async () => {
    try {
      const response = await axios.post(
        "/summarize",
        { transcript, useCache },
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      setSummaryState(response.data);
      setSummary(response.data);
    } catch (error) {
      console.error("Error summarizing transcript:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSummarize}>Summarize</button>
      <textarea
        style={{ width: "100%", height: "100px" }}
        value={summary}
        readOnly
      />
    </div>
  );
};

export default Summarize;
