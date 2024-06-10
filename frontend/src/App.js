import "./App.css";
import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Summarize from "./components/Summarize";
import GenerateSpeech from "./components/GenerateSpeech";

function App() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [apiKey, setApiKey] = useState("sample-api-key");
  const [useCache, setUseCache] = useState(false);

  return (
    <div className="App">
      <h1>Audio Analysis Web App</h1>
      <input
        type="text"
        placeholder="Enter API Key"
        onChange={(e) => setApiKey(e.target.value)}
      />
      <div>
        <label>
          Use Cache
          <input
            type="checkbox"
            checked={useCache}
            onChange={() => setUseCache(!useCache)}
          />
        </label>
        <FileUpload
          apiKey={apiKey}
          setTranscript={setTranscript}
        />
        <h3>Transcribed Text</h3>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          style={{ width: "100%", height: "100px" }}
        />
        <Summarize
          apiKey={apiKey}
          useCache={useCache}
          transcript={transcript}
          setSummary={setSummary}
        />
        <GenerateSpeech apiKey={apiKey} summary={summary} />
      </div>
    </div>
  );
}

export default App;
