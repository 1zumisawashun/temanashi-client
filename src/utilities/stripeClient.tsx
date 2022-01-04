import { loadStripe } from "@stripe/stripe-js";
import {
  CheckoutSessionDoc,
  PriceDoc,
  ProductDoc,
  SubscriptionDoc,
} from "../types/stripe";
import { firebase, projectFirestore } from "../firebase/config";

export type ProductItem = {
  product: ProductDoc;
  prices: { [key: string]: PriceDoc };
};

export type SubscriptionItem = {
  subscription: SubscriptionDoc;
  product: ProductDoc;
  price: PriceDoc;
};

class ProductUseCase {
  // * 参照
  async fetchAll(): Promise<ProductItem[]> {
    // Productを取得
    const productQuery = projectFirestore
      .collection("products")
      .where("active", "==", true);
    const productSnapshot = await productQuery.get();

    return await Promise.all(
      productSnapshot.docs.map(async (doc) => {
        // ProductのPriceを取得
        const priceRef = doc.ref.collection("prices");
        const priceSnapshot = await priceRef.where("active", "==", true).get();
        const priceMap = priceSnapshot.docs.reduce((acc, v) => {
          // @ts-ignore
          acc[v.id] = v.data() as PriceDoc;
          return acc;
        }, {});

        const productItem: ProductItem = {
          product: doc.data() as ProductDoc,
          prices: priceMap,
        };
        return productItem;
      })
    );
  }
  async add() {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY || "");
    if (!stripe) return;
  }

  // * 更新

  //NOTE:購入後にメールを送る、複数購入可能にする、カートページを作る,とりあえずcloud functionsを入れる、addできるようにする
  async buy(uid: string, priceId: string, url: string) {
    return new Promise(async (resolve, reject) => {
      const docRef = await projectFirestore
        .collection("customers")
        .doc(uid)
        .collection("checkout_sessions")
        .add({
          mode: "payment",
          //write for one-time-payment
          price: priceId,
          success_url: url,
          cancel_url: url,
        });

      docRef.onSnapshot(async (snap) => {
        // console.log(snap.data(), "snap");
        const { error, sessionId } = (await snap.data()) as CheckoutSessionDoc;
        if (error) return reject(error);
        if (!!sessionId) {
          const stripe = await loadStripe(
            process.env.REACT_APP_STRIPE_API_KEY || ""
          );
          if (!stripe) return reject();
          stripe.redirectToCheckout({ sessionId });
          return resolve(undefined);
        }
      });
    });
  }

  // * function
  async getCustomerURL() {
    const functionRef = await firebase
      .app()
      .functions("asia-northeast1")
      .httpsCallable("ext-firestore-stripe-subscriptions-createPortalLink");
    console.log(functionRef, "functionRef");
    // const prodUrl = "https://temanashi-39b3f.web.app/";
    // const { data } = await functionRef({ returnUrl: prodUrl });
    const { data } = await functionRef({ returnUrl: window.location.origin });
    return data.url;
  }
}

export const productUseCase = new ProductUseCase();
