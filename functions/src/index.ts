import * as functions from "firebase-functions";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51JBawwHlnbfxWLbN9zSs5c550PmsFCSVGLvQOR4wc5jb9FeMBZlMUMXcByo61YUVa7MhvzyOaJzHG8QOrJXSXRO20021tgTFeg",
  {
    apiVersion: "2020-08-27",
  }
);

// oncall methods
export const sayYeah = functions.https.onCall((data, context) => {
  const name = data.name;
  return `sayYeah, ${name}`;
});

// FIXME:timestampを追加する
export const addProduct = functions.https.onCall(async (data, context) => {
  //add stripe-meta-data
  const product = await stripe.products.create({
    name: data.name,
    images: [data.imageUrl],
    metadata: data,
  });

  await stripe.prices.create({
    unit_amount: data.price,
    currency: "jpy",
    recurring: { interval: "month" },
    product: product.id,
  });
  return data;
});

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  await response.send("hello world!");
});
