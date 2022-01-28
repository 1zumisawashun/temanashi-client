import { useEffect, useState } from "react";
import {
  productUseCase,
  ProductItemWithoutComment,
} from "../utilities/stripeClient";

export const useCartDocument = () => {
  const [documents, setDocuments] = useState<Array<ProductItemWithoutComment>>(
    []
  );

  const getItems = (): Array<string> => {
    const getItems = sessionStorage.getItem("productId");
    if (getItems) {
      const datalist: Array<string> = JSON.parse(getItems);
      return datalist;
    }
    return [""];
  };

  useEffect(() => {
    const randomDocument: Array<ProductItemWithoutComment> = [];

    function asyncLoop(items: Array<string>) {
      items.forEach(async (productId: string) => {
        const result = await productUseCase.fetchProductItemWitoutComment(
          productId
        );
        await randomDocument.push(result);
        if (randomDocument.length === items.length) {
          setDocuments(randomDocument);
        }
      });
    }
    const items = getItems();
    if (items) {
      return asyncLoop(items);
    }
  }, []);

  return { documents };
};
