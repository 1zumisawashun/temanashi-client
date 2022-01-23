import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const express = require("express");
const cors = require("cors");
const app = express();
const stripeRoute = require("./routes/stripeRoute");

app.options("*", cors({ origin: true }));
admin.initializeApp();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", stripeRoute);

const logActivities = functions.firestore
  .document("/{collection}/{id}")
  .onCreate((snap, context) => {
    const collection = context.params.collection;
    const activities = admin.firestore().collection("activities");
    if (collection === "products") {
      return activities.add({
        text: "a new product was added",
      });
    }
    if (collection === "users") {
      return activities.add({
        text: "a new user signed up",
      });
    }
    return null;
  });

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
