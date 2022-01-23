import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.options("*", cors({ origin: true }));
admin.initializeApp();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.STRIPE_API) throw new Error("we cant find your account");

const stripe = new Stripe(process.env.STRIPE_API, {
  apiVersion: "2020-08-27",
});

const logActivities = functions.firestore
  .document("/{collection}/{id}")
  .onCreate((snap, context) => {
    console.log(snap.data());
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

// onCall test
const helloOnCall = functions.https.onCall((data, context) => {
  return `hello, on call! ${data.name}`;
});
// onRequest test
const helloOnRequest = functions.https.onRequest((req, res) => {
  cors()(req, res, () => {
    res.status(200).send("hello, on request!");
  });
});
// get axios test
app.get("/hello", (req: any, res: any) => {
  res.status(200).json({ message: "hello, api sever!" });
});

app.post("/add-product", (req: any, res: any) => {
  functions.logger.info(req.body);
  cors()(req, res, async () => {
    // cors解除のためにラップする
    const { photos, name, price, description, ...body } = req.body;
    const createdAt = new Date().getTime() / 1000; // FIXME:timestampを追加する
    try {
      const product = await stripe.products.create({
        name: name,
        description,
        active: true, // falseにするとstripeのダッシュボードの商品タブのアーカイブに入るので表示されない状態になる
        images: photos, // 2MB未満の画像をアップロードしてくださいとのことでこれを満たさないと画像がアップロードされない
        metadata: {
          ...body, // NOTE:packageDimentionにwidthなどをまとめられる
          createdAt,
        },
      });
      await stripe.prices.create({
        unit_amount: price,
        currency: "jpy",
        product: product.id,
      });
    } catch (error) {
      return res.status(200).json({ status: req.body });
    } finally {
      return res.status(200).json({ status: req.body });
    }
  });
});

const api = functions.https.onRequest(app);
module.exports = { api, logActivities, helloOnCall, helloOnRequest };
