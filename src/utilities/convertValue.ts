export const convertedPath = (path: string): Array<string> => {
  const result = path.split("/");
  return result;
};

// priceWithTax() {
//   let total = 0;
//   this.products.forEach((product) => {
//     const { price, tax_rate } = product;
//     total = taxIncludedPrice(price, tax_rate).toLocaleString();
//     console.log(total, 'total');
//   });
//   return total;
// },

export const taxIncludedPrice = (price: number, tax_rate: number): number => {
  return Math.round(price * (1 + tax_rate / 100));
};
