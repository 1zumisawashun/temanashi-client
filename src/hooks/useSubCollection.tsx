import { useEffect, useState } from "react";
import { subCollectionPoint } from "../utilities/converter";

export const useSubCollection = <T, U>(path: Array<string>) => {
  const [documents, setDocuments] = useState<Array<U>>([]);
  const [error, setError] = useState<string | null>(null);
  const collection = path[1];
  const document = path[2];
  const subCollection = path[3];

  useEffect(() => {
    let ref = subCollectionPoint<T, U>(collection, document, subCollection);
    if (ref !== undefined) {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          let results: Array<U> = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setDocuments(results);
          console.log(results, "results");
          setError(null);
        },
        (error) => {
          console.log(error);
          setError("could not fetch the data");
        }
      );
      // unsubscribe on unmount and clean a function
      return () => unsubscribe();
    }
  }, [collection, document, subCollection]);

  return { documents, error };
};
