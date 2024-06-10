const express = require("express");
const router = express.Router();
const { summarizeText } = require("../services/openaiService");

const {
  validateApiKey,
  logRequestResponse,
  checkCache,
  saveToCache,
} = require("../repository/SqliteRepository");

router.post("/", validateApiKey, async (req, res) => {
  const request = req.body;
  const useCache = request.useCache || false;

  const requestKey = JSON.stringify(request);

  if (useCache) {
    checkCache(requestKey, async (cacheErr, cacheRow) => {
      if (cacheErr) {
        return res.status(500).send(cacheErr.message);
      }

      if (cacheRow) {
        console.log("Returning cached result");
        return res.json(JSON.parse(cacheRow.response));
      }

      try {
        const result = await summarizeText(request.transcript);

        logRequestResponse(request, result);

        saveToCache(requestKey, JSON.stringify(result));

        res.json(result);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });
  } else {
    try {
      const result = await summarizeText(request.transcript);

      logRequestResponse(request, result);

      res.json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
});

module.exports = router;
