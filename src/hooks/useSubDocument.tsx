import { useEffect, useState } from "react";
import { subDocumentPoint } from "../utilities/db";
import { firebase } from "../firebase/config";

type Id = {
  id: string; // 追加したい型
};

export const useSubDocument = <T, U>(path: Array<string>) => {
  const [documents, setDocuments] = useState<U & Id>();
  const [error, setError] = useState<string | null>(null);
  const [
    referense,
    setReferense,
  ] = useState<firebase.firestore.DocumentReference<U> | null>(null);
  const collection = path[0];
  const document = path[1];
  const subCollection = path[2];
  const subDocument = path[3];

  useEffect(() => {
    const ref = subDocumentPoint<T, U>(
      collection,
      document,
      subCollection,
      subDocument
    );
    if (ref) {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          if (snapshot) {
            setDocuments({
              ...(snapshot.data() as U),
              id: snapshot.id,
            });
            setReferense(ref);
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
  }, [collection, document, subCollection, subDocument]);

  return { documents, error, referense };
};
