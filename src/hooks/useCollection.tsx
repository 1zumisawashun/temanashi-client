import { useEffect, useState, useRef } from "react";
import { firebase } from "../firebase/config";
import { collectionPoint } from "../utilities/converter";
import { firebasePath } from "../@types/dashboard";

export const useCollection = <T,>(
  { collection }: firebasePath,
  _query?: [string, WhereFilterOp, any],
  _orderBy?: [string, OrderByDirection]
) => {
  const [documents, setDocuments] = useState<Array<T>>([]);
  const [error, setError] = useState<string | null>(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collectionPoint<T>(collection);
    if (query) {
      ref = ref.where(...query) as firebase.firestore.CollectionReference<T>;
    }
    if (orderBy) {
      ref = ref.orderBy(
        ...orderBy
      ) as firebase.firestore.CollectionReference<T>;
    }
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        const results: Array<T> = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setDocuments(results);
        setError(null);
      },
      (error) => {
        setError("could not fetch the data");
      }
    );
    // unsubscribe on unmount and clean a function
    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error };
};
