const express = require("express");
const router = express.Router();
const { generateSpeech } = require("../services/openaiService");
const { validateApiKey } = require("../repository/SqliteRepository");

router.post("/", validateApiKey, async (req, res) => {
  try {
    const result = await generateSpeech(req.body.text);
    res.set({
      "Content-Type": "audio/mpeg", 
      "Content-Disposition": 'attachment; filename="speech.mp3"',
    });
    res.send(Buffer.from(result));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
