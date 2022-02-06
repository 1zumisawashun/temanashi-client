import { useEffect, useState } from "react";
import {
  productUseCase,
  ProductItemWithoutComment,
} from "../utilities/stripeClient";
import { useCookies } from "react-cookie";

export const useCartDocument = () => {
  const [documents, setDocuments] = useState<Array<ProductItemWithoutComment>>(
    []
  );
  const [cookies] = useCookies(["productId"]);

  useEffect(() => {
    const randomDocument: Array<ProductItemWithoutComment> = [];

    function asyncLoop() {
      cookies.productId.forEach(async (productId: string) => {
        const result = await productUseCase.fetchProductItemWitoutComment(
          productId
        );
        await randomDocument.push(result);
        if (randomDocument.length === cookies.productId.length) {
          setDocuments(randomDocument);
        }
      });
    }
    if (cookies.productId.length) {
      return asyncLoop();
    }
  }, [cookies.productId]);

  return { documents };
};
