import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { ProductDoc } from "../@types/stripe";
import { useCookies } from "react-cookie";

export const useRandomDocument = () => {
  const [documents, setDocuments] = useState<Array<ProductDoc>>([]);
  const [cookies] = useCookies(["random"]);
  const randomIndex = Number(cookies.random);

  useEffect(() => {
    let indexs: Array<string> = [];
    let randomDocument: Array<ProductDoc> = [];

    async function handleAsync() {
      while (randomDocument.length < 5) {
        const queryIndex = String(Math.floor(Math.random() * randomIndex + 1)); // DBの中に格納されている商品数以下の数字をランダムで出力する
        if (!indexs.includes(queryIndex)) {
          indexs = [...indexs, queryIndex];
          const productsRef = await projectFirestore.collection("products");
          const snapshot = await productsRef
            .orderBy("metadata.random")
            .startAt(queryIndex)
            .endAt(queryIndex)
            .get(); // startAtとendAtを同一に指定することでユニークな結果を出力できる
          const data = snapshot.docs.map((doc) => {
            return { ...(doc.data() as ProductDoc), id: doc.id };
          });
          randomDocument = [...randomDocument, ...data];
          if (randomDocument.length === 5) {
            setDocuments(randomDocument);
          }
        }
      }
    }
    handleAsync();
  }, [randomIndex]);

  return { documents };
};
