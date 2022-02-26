import { loadStripe } from "@stripe/stripe-js";
import {
  CheckoutSessionDoc,
  PriceDoc,
  ProductDoc,
  SubscriptionDoc,
} from "../@types/stripe";
import { projectFirestore } from "../firebase/config";
import { Comment } from "../@types/dashboard";

export type ProductItem = {
  product: ProductDoc;
  prices: { [key: string]: PriceDoc };
  comments: Array<Comment>;
};

export type ProductItemWithoutComment = Pick<ProductItem, "product" | "prices">;

export type SubscriptionItem = {
  subscription: SubscriptionDoc;
  product: ProductDoc;
  price: PriceDoc;
};

export type line_item = {
  price: string;
  quantity: number;
};

class ProductUseCase {
  /**
   * 参照①
   */
  async fetchAll(): Promise<ProductItem[]> {
    const productQuery = projectFirestore
      .collection("products")
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
          comments: [], // FIXME:PickでCommentを省く
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
   * 参照③
   */
  async fetchProductItemWitoutComment(
    id: string
  ): Promise<ProductItemWithoutComment> {
    const productItemRef = projectFirestore.collection("products").doc(id);
    const productItemSnapshot = await productItemRef.get();
    const priceRef = await productItemSnapshot.ref.collection("prices");
    const priceSnapshot = await priceRef.get();
    const priceMap = await priceSnapshot.docs.reduce((acc, v) => {
      // @ts-ignore
      acc[v.id] = v.data() as PriceDoc;
      return acc;
    }, {});

    const productItem: ProductItemWithoutComment = {
      product: {
        id: productItemSnapshot.id,
        ...productItemSnapshot.data(),
      } as ProductDoc,
      prices: priceMap,
    };
    return productItem;
  }
  /**
   * 参照④
   */
  async fetchPayments(uid: string): Promise<any> {
    const paymentsRef = await projectFirestore
      .collection("customers")
      .doc(uid)
      .collection("payments")
      .where("status", "==", "succeeded");
    const paymentSnapshot = await paymentsRef.get();
    const payments = await paymentSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return payments;
  }
  /**
   * 更新①
   */
  // NOTE:購入後にメールを送る
  // NOTE:stockの項目を作り0になったらsctive:falseにして購入不可にする
  async buy(
    uid: string,
    line_items: Array<line_item>,
    success_url: string,
    cancel_url: string
  ) {
    return new Promise(async (resolve, reject) => {
      const docRef = await projectFirestore
        .collection("customers")
        .doc(uid)
        .collection("checkout_sessions")
        .add({
          mode: "payment",
          line_items, // 複数購入に対応
          success_url,
          cancel_url,
        });
      console.log(docRef, "commentMap");
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
}

export const productUseCase = new ProductUseCase();
