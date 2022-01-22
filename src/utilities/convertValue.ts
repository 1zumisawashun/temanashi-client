export const convertedPath = (path: string): Array<string> => {
  const result = path.split("/");
  return result;
};

export const taxIncludedPrice = (price: number, taxRate?: number): string => {
  const useTaxRate = 1.1;
  taxRate = useTaxRate;
  return `¥${Math.round(price * (1 + taxRate / 100)).toLocaleString()}`;
};

export const delay = (t: number) => new Promise((r) => setTimeout(r, t));