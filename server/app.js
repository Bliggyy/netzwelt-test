const express = require("express");
const cors = require("cors");
const port = 8000;

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("CORS-enabled web server listening on port 8000");
});
