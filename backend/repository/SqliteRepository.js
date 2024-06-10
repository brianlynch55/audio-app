
const getDatabase = require("../db/database");
const db = getDatabase();


const logRequestResponse = (request, response) => {
  db.run("INSERT INTO logs (request, response) VALUES (?, ?)", [
    JSON.stringify(request),
    JSON.stringify(response),
  ]);
};

const checkCache = (request, callback) => {
  db.get(
    "SELECT * FROM cache WHERE request = ?",
    [JSON.stringify(request)],
    (err, row) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, row);
    }
  );
};

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  console.log("checking api key", apiKey);

  db.get("SELECT * FROM api_keys WHERE key = ?", [apiKey], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (!row) {
      return res.status(403).send("Forbidden");
    }
    next();
  });
};
const saveToCache = (request, response) => {
    db.run("INSERT INTO cache (request, response, timestamp) VALUES (?, ?, ?)", [
      JSON.stringify(request),
      JSON.stringify(response),
      Date.now(),
    ]);
  };
  
module.exports = {
    validateApiKey,
    logRequestResponse,
    checkCache,
    saveToCache,
  };