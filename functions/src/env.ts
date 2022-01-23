import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.STRIPE_API) throw new Error("we cant find your account");

export const STRIPE_API = process.env.STRIPE_API;
