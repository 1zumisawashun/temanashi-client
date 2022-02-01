import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { ProductDoc } from "../@types/stripe";
import { useCookies } from "react-cookie";

export const useRandomDocument = () => {
  const [documents, setDocuments] = useState<Array<ProductDoc>>([]);
  const [cookies] = useCookies();
  const random = Number(cookies.random);

  useEffect(() => {
    const indexs: Array<string> = [];
    const randomDocument: Array<ProductDoc> = [];

    async function asyncLoop() {
      // FIXME:ランダムで出すならそれ用のコレクションの作成とrandamパラメータを付与しなくてはいけない
      // FIXME:cloud functionsで登録するとランダムがstringになり型不一致になるので直す
      while (randomDocument.length < 5) {
        const startIndex = String(Math.floor(Math.random() * random + 1)); // documentsの中からランダムでstartIndexに1個格納する
        if (!indexs.includes(startIndex)) {
          indexs.push(startIndex); // 同じdocumentを表示しないために一度使用したindexを配列に追加する
          const projectsRef = await projectFirestore.collection("products");
          const snapshot = await projectsRef
            .orderBy("metadata.random")
            .startAt(startIndex) // キー名randomがstartIndexと同じ物を取得する
            .endAt(startIndex) // querying 1 random items
            .get();
          const data = await snapshot.docs.map((doc) => {
            return { ...(doc.data() as ProductDoc), id: doc.id };
          });
          await randomDocument.push(...data); //1個のみ配列をパースしてオブジェクトをpushする
          if (randomDocument.length === 5) {
            setDocuments(randomDocument);
          }
        }
      }
    }
    asyncLoop();
  }, [random]);

  return { documents };
};
