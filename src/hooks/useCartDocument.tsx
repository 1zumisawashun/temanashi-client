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
    async function handleAsync() {
      // NOTE:promisesの型推論がされない
      const promises: Array<
        Promise<ProductItemWithoutComment>
      > = cookies.productId.map(
        async (productId: string): Promise<ProductItemWithoutComment> => {
          const productItem = await productUseCase.fetchProductItemWitoutComment(
            productId
          );
          return productItem;
        }
      );
      const result = await Promise.all(promises);
      setDocuments(result);
    }
    if (cookies.productId) {
      handleAsync();
    }
  }, [cookies.productId]);

  return { documents };
};
