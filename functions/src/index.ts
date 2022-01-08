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

export const addProduct = functions.https.onCall(async (data, context) => {
  //add stripe-meta-data
  const product = await stripe.products.create({
    name: "test1",
    metadata: {
      item1: "text",
      item2: "text",
      item3: "text",
    },
  });

  await stripe.prices.create({
    unit_amount: 100,
    currency: "jpy",
    recurring: { interval: "month" },
    product: product.id,
  });
});

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  await response.send("hello world!");
});
