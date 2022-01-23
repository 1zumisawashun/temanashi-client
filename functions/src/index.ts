import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";
const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

admin.initializeApp();
// jsonデータを扱う
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

if (!process.env.STRIPE_API) throw new Error("we cant find your account");

const stripe = new Stripe(process.env.STRIPE_API, {
  apiVersion: "2020-08-27",
});

// FIXME:timestampを追加する
const addProduct = functions.https.onCall(
  async ({ photos, name, price, description, ...data }, context) => {
    //add stripe-meta-data
    const createdAt = new Date().getTime() / 1000;
    const product = await stripe.products.create({
      //NOTE:packageDimentionにwidthなどをまとめられる
      name,
      description,
      active: true,
      // active:false,
      // falseにすると商品のアーカイブに入るので表示されない状態になる
      //普通にstockが0になったらfirestoreのactiveをfalseにして非表示で問題ないかと
      images: photos,
      metadata: {
        ...data,
        createdAt,
        // エラーが発生するため一旦コメントアウト
        //2MB 未満の画像をアップロードしてくださいとのことでこれを満たさないと画像がアップロードされない
        // created_at: admin.firestore.FieldValue.serverTimestamp(),
        // likedCount: admin.firestore.FieldValue.increment(0),
      },
    });

    functions.logger.log(product, "check product");

    await stripe.prices.create({
      unit_amount: price,
      currency: "jpy",
      product: product.id,
    });
    return data;
  }
);

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
const sayhello = functions.https.onCall((data, context) => {
  return `sayHello, ${data.name}`;
});
// onRequest test
const helloWorld = functions.https.onRequest(async (request, response) => {
  await response.send("hello world!");
});

app.get("/hello-send", (req: any, res: any) => {
  functions.logger.info("hello! send test");
  res.status(200).send({ message: "hello send, api sever!" });
});
app.get("/hello-json", (req: any, res: any) => {
  functions.logger.info("hello! json test");
  res.status(200).json({ message: "hello, api sever!" });
});

app.post("/add-product", async (req: any, res: any) => {
  const { photos, name, price, description, ...data } = res.body;
  const createdAt = new Date().getTime() / 1000;
  const product = await stripe.products.create({
    name,
    description,
    active: true,
    images: photos,
    metadata: {
      ...data,
      createdAt,
    },
  });
  await stripe.prices.create({
    unit_amount: price,
    currency: "jpy",
    product: product.id,
  });

  res.end();
});

const api = functions.https.onRequest(app);
module.exports = { api, addProduct, logActivities, sayhello, helloWorld };
