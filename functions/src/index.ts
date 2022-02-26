import * as functions from "firebase-functions";
import { Request, Response } from "express";
import * as express from "express";
import * as cors from "cors";
import {
  createJWT,
  authenticateWithJWT,
  authenticateWithFirebase,
} from "./middleware/authMiddleware";
// NOTE:requireでモジュールを読み込むと型がanyになる
// NOTE:emulatorは既に入っている（npm run serveは使える）よく見るあれはGUIのをインポートするかの差
// NOTE:postmanはcorsを無視するので検証で使える

const app = express();
const stripeRoute = require("./routes/stripeRoute");
const logActivities = require("./utilities/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

// On Request Test
const helloOnRequest = functions.https.onRequest((req, res) => {
  cors()(req, res, () => {
    res.status(200).send("hello, on request!");
  });
});

// On Call Test
const helloOnCall = functions.https.onCall((data, context) => {
  return `hello, on call! ${data.name}`;
});

// Get Axios Test
app.get("/hello", (req: any, res: any) => {
  res.status(200).json({ message: "hello world" });
});

// jwtの発行
app.post("/jwt", createJWT);

// jwtの確認
app.get(
  "/jwt/check",
  [authenticateWithJWT, authenticateWithFirebase],
  (req: Request, res: Response) => {
    res.status(200).json({ message: "認証されました。" });
  }
);

app.use("/", [authenticateWithJWT, authenticateWithFirebase], stripeRoute);

const api = functions.https.onRequest(app);
module.exports = { api, logActivities, helloOnCall, helloOnRequest };
