import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { ProjectType } from "../types/dashboard";

export const useRandomDocument = () => {
  const [documents, setDocuments] = useState<Array<ProjectType>>([]);

  useEffect(() => {
    const indexs: Array<number> = [];
    const randomDocument: Array<ProjectType> = [];
    async function asyncLoop() {
      //FIXME:ランダムで出すならそれ用のコレクションの作成とrandamパラメータを付与しなくてはいけない
      while (randomDocument.length < 5) {
        const startIndex = Math.floor(Math.random() * 7 + 1); // documentsの中からランダムでstartIndexに1個格納する
        if (!indexs.includes(startIndex)) {
          indexs.push(startIndex); // 同じdocumentを表示しないために一度使用したindexを配列に追加する
          const projectsRef = await projectFirestore.collection("projects");
          const snapshot = await projectsRef
            .orderBy("random")
            .startAt(startIndex)
            .endAt(startIndex) //querying 1 random items
            .get();
          const data = await snapshot.docs.map((doc) => {
            return { ...(doc.data() as ProjectType), id: doc.id };
          });
          //1個のみ配列をパースしてオブジェクトをpushする
          await randomDocument.push(...data);
          if (randomDocument.length === 5) {
            setDocuments(randomDocument);
          }
        }
      }
    }
    asyncLoop();
  }, []);

  return { documents };
};
