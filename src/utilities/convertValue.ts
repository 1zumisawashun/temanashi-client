import { firebasePath } from "../@types/dashboard";

export const convertedPath = (path: string): firebasePath => {
  const result = path.split("/");
  return {
    collection: result[1] ?? "",
    document: result[2] ?? "",
    subCollection: result[3] ?? "",
    subDocument: result[4] ?? "",
  };
};

export const taxIncludedPrice = (price: number, taxRate?: number): string => {
  const useTaxRate = 1.1;
  taxRate = useTaxRate;
  return `¥${Math.round(price * (1 + taxRate / 100)).toLocaleString()}`;
};

export const delay = (t: number) => new Promise((r) => setTimeout(r, t));
