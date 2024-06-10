const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const { transcribeAudio } = require("../services/openaiService");

const { validateApiKey } = require("../repository/SqliteRepository");

router.post("/", validateApiKey, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;
  const uploadPath = path.join(__dirname, "..", "uploads", file.name);

  file.mv(uploadPath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    console.log("File received:", file); 

    try {
      const result = await transcribeAudio(uploadPath);
      res.json(result);
      fs.unlink(uploadPath, (err) => {
        if (err) {
          console.error("Error deleting temp file:", err);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send(error.message);
    }
  });
});

module.exports = router;
