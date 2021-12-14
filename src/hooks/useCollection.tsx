import { useEffect, useState, useRef } from "react";
import { firebase, projectFirestore } from "../firebase/config";
import { UseCollection } from "../types/dashboard";

type ref = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

export const useCollection = (
  collection: string,
  _query?: Array<string | number>,
  _orderBy?: Array<string | number>
): UseCollection => {
  const [documents, setDocuments] = useState<Array<any>>([]);
  const [error, setError] = useState<string | null>(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref: ref = projectFirestore.collection(collection);
    if (query) {
      // @ts-ignore
      ref = ref.where(...query);
    }
    if (orderBy) {
      // @ts-ignore
      ref = ref.orderBy(...orderBy);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results: any = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

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
  }, [collection, query, orderBy]);

  return { documents, error };
};
