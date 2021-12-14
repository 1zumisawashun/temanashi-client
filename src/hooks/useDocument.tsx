import { useEffect, useState } from "react";
import { firebase, projectFirestore } from "../firebase/config";

export const useDocument = (collection: any, id: any) => {
  const [document, setDocument] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  //real time data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);
    const unsubscribe = ref.onSnapshot(
      (
        snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
      ) => {
        if (snapshot.data()) {
          console.log(snapshot.data());
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
  }, [collection, id]);

  return { document, error };
};
