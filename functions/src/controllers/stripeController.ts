import Stripe from "stripe";
// import { STRIPE_API } from "../env";
import * as functions from "firebase-functions";
import { RequestHandler } from "express";

const cors = require("cors");
const stripe = new Stripe(
  "sk_test_51JBawwHlnbfxWLbN9zSs5c550PmsFCSVGLvQOR4wc5jb9FeMBZlMUMXcByo61YUVa7MhvzyOaJzHG8QOrJXSXRO20021tgTFeg",
  { apiVersion: "2020-08-27" }
);

const stripe_post: RequestHandler = (req, res) => {
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
      return res.status(200).json({ status: req.body });
    } catch (error) {
      return res.status(400).json({ status: req.body });
    }
  });
};

module.exports = {
  stripe_post,
};
