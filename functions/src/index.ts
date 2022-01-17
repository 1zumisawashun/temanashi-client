import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";

admin.initializeApp();

const stripe = new Stripe(
  "sk_test_51JBawwHlnbfxWLbN9zSs5c550PmsFCSVGLvQOR4wc5jb9FeMBZlMUMXcByo61YUVa7MhvzyOaJzHG8QOrJXSXRO20021tgTFeg",
  {
    apiVersion: "2020-08-27",
  }
);

// FIXME:timestampを追加する
export const addProduct = functions.https.onCall(
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

export const logActivities = functions.firestore
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
export const sayhello = functions.https.onCall((data, context) => {
  return `sayHello, ${data.name}`;
});
// onRequest test
export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    await response.send("hello world!");
  }
);
