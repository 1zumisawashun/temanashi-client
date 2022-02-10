/*
 * Copyright 2020 Stripe, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Stripe from "stripe";
import FirebaseFirestore from "@firebase/firestore-types";

export interface CustomerData {
  metadata: {
    firebaseUID: string;
  };
  email?: string;
}

export interface Price {
  /**
   * stripe properties
   */
  active: boolean;
  currency: string;
  unit_amount: number;
  description: string | null;
  type: "one_time" | "recurring";
  interval: "day" | "month" | "week" | "year" | null;
  interval_count: number | null;
  trial_period_days: number | null;
  [propName: string]: any;
}

export type Comment = {
  displayName: firebase.UserInfo.displayName;
  photoURL: firebase.UserInfo.photoURL;
  content: string;
  createdAt: firebase.firestore.Timestamp;
  id: number;
};

export type Metadata = {
  width: string;
  height: string;
  length?: string;
  stock: string;
  random: string;
  category: string;
  createdAt: string;
  [propName: string]: any;
};

export interface Product {
  /**
   * my additional properties
   */
  id: string;
  comments?: Array<Comment>;
  metadata?: Metadata;
  /**
   * stripe properties
   */
  active: boolean;
  name: string;
  description: string | null;
  role: string | null;
  images: Array<string>;
  prices?: Array<Price>;
  [propName: string]: any;
}

export interface TaxRate extends Stripe.TaxRate {
  /**
   * Any stripe additional properties
   */
  [propName: string]: any;
}

export interface Subscription {
  /**
   * stripe properties
   */
  metadata: {
    [name: string]: string;
  };
  stripeLink: string;
  role: string | null;
  quantity: number;
  items: Stripe.SubscriptionItem[];
  product: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  price: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  prices: Array<
    FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
  >;
  status:
    | "active"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "past_due"
    | "trialing"
    | "unpaid";
  cancel_at_period_end: boolean;
  created: FirebaseFirestore.Timestamp;
  current_period_start: FirebaseFirestore.Timestamp;
  current_period_end: FirebaseFirestore.Timestamp;
  ended_at: FirebaseFirestore.Timestamp | null;
  cancel_at: FirebaseFirestore.Timestamp | null;
  canceled_at: FirebaseFirestore.Timestamp | null;
  trial_start: FirebaseFirestore.Timestamp | null;
  trial_end: FirebaseFirestore.Timestamp | null;
}
