import { useEffect, useState } from "react";
import { documentPoint } from "../utilities/converter";
import { firebasePath } from "../@types/dashboard";

export const useDocument = <T,>({ collection, document }: firebasePath) => {
  type Id = {
    id: string; // 追加したい型
  };

  const [documents, setDocuments] = useState<T & Id>();
  const [error, setError] = useState<string | null>(null);

  //real time data for document
  useEffect(() => {
    let ref = documentPoint<T>(collection, document);
    if (ref !== undefined) {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          if (snapshot) {
            setDocuments({
              ...(snapshot.data() as T),
              id: snapshot.id,
            });
            setError(null);
          } else {
            setError("no such socument exist");
          }
        },
        (err) => {
          console.log(err);
          setError("failed to get document");
        }
      );
      // clean a function
      return () => unsubscribe();
    }
  }, [collection, document]);
  // loading入れる。
  // reactqueryを確認する
  // undefiendが帰るのはしかたないのでloading(reactqueryにある？)する
  // 流クエスト失敗しても２回するとか便利っぽい・

  return { documents, error };
};
