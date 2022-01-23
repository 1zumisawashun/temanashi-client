import * as functions from "firebase-functions";

const express = require("express");
const cors = require("cors");
const app = express();
const stripeRoute = require("./routes/stripeRoute");
const logActivities = require("./utilities/logger");

app.options("*", cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", stripeRoute);
app.use(logActivities);

// On Call Test
const helloOnCall = functions.https.onCall((data, context) => {
  return `hello, on call! ${data.name}`;
});

// On Request Test
const helloOnRequest = functions.https.onRequest((req, res) => {
  cors()(req, res, () => {
    res.status(200).send("hello, on request!");
  });
});

// Get Axios Test
app.get("/hello", (req: any, res: any) => {
  res.status(200).json({ message: "hello, api sever!" });
});

const api = functions.https.onRequest(app);
module.exports = { api, logActivities, helloOnCall, helloOnRequest };
