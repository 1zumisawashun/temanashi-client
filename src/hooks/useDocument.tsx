import { useEffect, useState } from "react";
// import { projectFirestore } from "../firebase/config";
import { documentPoint } from "../utilities/db";

export const useDocument = <T,>(collection: string, docId: string) => {
  const [document, setDocument] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  console.log(collection, docId, "yeahyeahyeahyeah");

  //real time data for document
  useEffect(() => {
    let ref = documentPoint<T>(collection, docId);
    console.log(ref, "useDocument");

    if (ref !== undefined) {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          if (snapshot) {
            console.log(snapshot.data(), "snapshot.data()");
            setDocument({ ...snapshot.data(), id: snapshot.id });
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
