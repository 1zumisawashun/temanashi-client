import { useEffect, useState } from "react";
import { documentPoint } from "../utilities/db";

export const useDocument = <T,>(collection: string, docId: string) => {
  type Id = {
    id: string; // 追加したい型
  };

  const [document, setDocument] = useState<T & Id>();
  const [error, setError] = useState<string | null>(null);

  //real time data for document
  useEffect(() => {
    let ref = documentPoint<T>(collection, docId);
    if (ref !== undefined) {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          if (snapshot) {
            setDocument({
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
  }, [collection, docId]);

  return { document, error };
};
