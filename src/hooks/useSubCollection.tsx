import { useEffect, useState } from "react";
import { subCollectionPoint } from "../utilities/converter";
import { firebase } from "../firebase/config";
import { firebasePath } from "../@types/dashboard";

export const useSubCollection = <T, U>({
  collection,
  document,
  subCollection,
}: firebasePath) => {
  const [documents, setDocuments] = useState<Array<U>>([]);
  const [error, setError] = useState<string | null>(null);
  const [
    referense,
    setReferense,
  ] = useState<firebase.firestore.CollectionReference<U> | null>(null);

  useEffect(() => {
    let ref = subCollectionPoint<T, U>(collection, document, subCollection);
    if (ref !== undefined) {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          let results: Array<U> = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          setReferense(ref);
          setDocuments(results);
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

  return { documents, error, referense };
};
