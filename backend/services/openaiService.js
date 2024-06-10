const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const transcribeAudio = async (filePath) => {
  console.log("filePath", filePath);

  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));
  formData.append("model", "whisper-1");

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "API request error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const summarizeText = async (transcript) => {
  console.log("transcript", transcript);
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `Summarize the following text in 10 words: ${transcript}`,
          },
        ],
        max_tokens: 10,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error(
      "API request error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const generateSpeech = async (summary) => {
  console.log(summary);
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/speech",
      {
        model: "tts-1",
        input: summary,
        voice: "alloy",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "API request error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

module.exports = {
  transcribeAudio,
  summarizeText,
  generateSpeech,
};
