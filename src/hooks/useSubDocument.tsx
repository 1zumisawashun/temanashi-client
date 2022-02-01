import { useEffect, useState } from "react";
import { subDocumentPoint } from "../utilities/converter";
import { firebase } from "../firebase/config";
import { firebasePath } from "../@types/dashboard";

type Id = {
  id: string; // 追加したい型
};

export const useSubDocument = <T, U>({
  collection,
  document,
  subCollection,
  subDocument,
}: firebasePath) => {
  const [documents, setDocuments] = useState<U & Id>();
  const [error, setError] = useState<string | null>(null);
  const [
    referense,
    setReferense,
  ] = useState<firebase.firestore.DocumentReference<U> | null>(null);

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
