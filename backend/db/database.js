const sqlite3 = require("sqlite3").verbose();

let db;

const getDatabase = () => {
  if (!db) {
    db = new sqlite3.Database(":memory:");

    db.serialize(() => {
      db.run(
        "CREATE TABLE IF NOT EXISTS api_keys (id INTEGER PRIMARY KEY, key TEXT)"
      );
      db.run(
        "CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY, request TEXT, response TEXT)"
      );
      db.run(
        "CREATE TABLE IF NOT EXISTS cache (id INTEGER PRIMARY KEY, request TEXT, response TEXT, timestamp INTEGER)"
      );
      db.run("INSERT INTO api_keys (key) VALUES ('sample-api-key')");
    });
  }
  return db;
};

module.exports = getDatabase;
