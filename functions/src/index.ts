import * as functions from "firebase-functions";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51JBawwHlnbfxWLbN9zSs5c550PmsFCSVGLvQOR4wc5jb9FeMBZlMUMXcByo61YUVa7MhvzyOaJzHG8QOrJXSXRO20021tgTFeg",
  {
    apiVersion: "2020-08-27",
  }
);

// oncall methods
export const sayYeah = functions.https.onCall(async (data, context) => {
  const product = await stripe.products.create({
    name: "商品名",
    description: "商品の説明文",
  });
  console.log(product, "product");
  await stripe.prices.create({
    unit_amount: 100,
    currency: "jpy",
    recurring: { interval: "month" },
    product: product.id,
  });
  const name = data.name;
  return `sayYeah, ${name}`;
});

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  await response.send("hello world!");
});
