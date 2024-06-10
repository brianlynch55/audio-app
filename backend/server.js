const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const getDatabase = require("./db/database"); 

dotenv.config();

const transcribeRoute = require("./routes/transcribe");
const summarizeRoute = require("./routes/summarize");
const speakRoute = require("./routes/speak");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/transcribe", transcribeRoute);
app.use("/summarize", summarizeRoute);
app.use("/speak", speakRoute);
const db = getDatabase(); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
