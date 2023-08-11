// import fetch from "node-fetch"
import express, { json } from "express";
import cors from "cors";
import axios from "axios";
const port = 8000;

const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/account/login", async (req, res) => {
  const url = "https://netzwelt-devtest.azurewebsites.net/Account/SignIn";
  const data = req.body;
  try {
    const response = await axios.post(url, data);
    if (response.status === 200) {
      const responseData = response.data;
      res.status(200).json(responseData);
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
});

app.get("/home/index", async (req, res) => {
  const url = "https://netzwelt-devtest.azurewebsites.net/Territories/All";
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const responseData = response.data;
      console.log("Data successfully retrieved");
      res.status(200).json(responseData);
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
});

app.listen(port, () => {
  console.log("CORS-enabled web server listening on port 8000");
});
