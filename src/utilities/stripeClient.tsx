import { loadStripe } from "@stripe/stripe-js";
import {
  CheckoutSessionDoc,
  PriceDoc,
  ProductDoc,
  SubscriptionDoc,
} from "../types/stripe";
import { firebase, projectFirestore } from "../firebase/config";
import { Comment } from "../types/dashboard";
export type ProductItem = {
  product: ProductDoc;
  prices: { [key: string]: PriceDoc };
  comments: Array<Comment>;
};

export type SubscriptionItem = {
  subscription: SubscriptionDoc;
  product: ProductDoc;
  price: PriceDoc;
};

export type urls = {
  seccess_url: string;
  cancel_url: string;
};

class ProductUseCase {
  /**
   * 参照①
   */
  async fetchAll(): Promise<ProductItem[]> {
    const productQuery = projectFirestore
      .collection("products")
      // .where("active", "==", true)
      .orderBy("metadata.createdAt", "desc");

    const productSnapshot = await productQuery.get();
    return await Promise.all(
      productSnapshot.docs.map(async (doc) => {
        const priceRef = doc.ref.collection("prices");
        const priceSnapshot = await priceRef.where("active", "==", true).get();
        const priceMap = priceSnapshot.docs.reduce((acc, v) => {
          // @ts-ignore
          acc[v.id] = v.data() as PriceDoc;
          return acc;
        }, {});
        const productItem: ProductItem = {
          product: {
            id: doc.id,
            ...doc.data(),
          } as ProductDoc,
          prices: priceMap,
          comments: [], //PickでCommentを省く
        };
        return productItem;
      })
    );
  }
  /**
   * 参照②
   */
  async fetchProductItem(id: string): Promise<ProductItem> {
    const productItemRef = projectFirestore.collection("products").doc(id);
    const productItemSnapshot = await productItemRef.get();
    const priceRef = await productItemSnapshot.ref.collection("prices");
    const priceSnapshot = await priceRef.where("active", "==", true).get();
    const priceMap = await priceSnapshot.docs.reduce((acc, v) => {
      // @ts-ignore
      acc[v.id] = v.data() as PriceDoc;
      return acc;
    }, {});

    const commentRef = await productItemSnapshot.ref.collection("comments");
    const commentSnapshot = await commentRef.get();

    const commentMap = await commentSnapshot.docs.map((snapshot) => {
      return snapshot.data();
    });
    console.log(commentMap, "commentMap");
    const productItem: ProductItem = {
      product: {
        id: productItemSnapshot.id,
        ...productItemSnapshot.data(),
      } as ProductDoc,
      prices: priceMap,
      comments: commentMap as Array<Comment>,
    };
    return productItem;
  }
  /**
   * 更新①
   */

  //NOTE:購入後にメールを送る、複数購入可能にする、カートページを作る,とりあえずcloud functionsを入れる、addできるようにする
  //NOTE:stockの項目を作り0になったらsctive:falseにして購入不可にする
  async buy(uid: string, priceId: string, url: urls) {
    return new Promise(async (resolve, reject) => {
      const docRef = await projectFirestore
        .collection("customers")
        .doc(uid)
        .collection("checkout_sessions")
        .add({
          mode: "payment",
          price: priceId,
          success_url: url.seccess_url,
          cancel_url: url.cancel_url,
        });

      docRef.onSnapshot(async (snap) => {
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
  /**
   * 参照②
   */
  async getCustomerURL() {
    const functionRef = await firebase
      .app()
      .functions("asia-northeast1")
      .httpsCallable("ext-firestore-stripe-subscriptions-createPortalLink");
    console.log(functionRef, "functionRef");
    const { data } = await functionRef({ returnUrl: window.location.origin });
    return data.url;
  }
}

export const productUseCase = new ProductUseCase();
