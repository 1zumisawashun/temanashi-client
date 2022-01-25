import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
// NOTE:requireでモジュールを読み込むと型がanyになる
// NOTE:emulatorは既に入っている（npm run serveは使える）よく見るあれはGUIのをインポートするかの差

const app = express();
const stripeRoute = require("./routes/stripeRoute");
const logActivities = require("./utilities/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.use("/", stripeRoute);

// On Call Test
const helloOnCall = functions.https.onCall((data, context) => {
  return `hello, on call! ${data.name}`;
});

// On Request Test
const helloOnRequest = functions.https.onRequest((req, res) => {
  res.status(200).send("hello, on request!");
});

// Get Axios Test
app.get("/hello", (req: any, res: any) => {
  res.status(200).json({ message: "hello, api sever!" });
});

const api = functions.https.onRequest(app);
module.exports = { api, logActivities, helloOnCall, helloOnRequest };
