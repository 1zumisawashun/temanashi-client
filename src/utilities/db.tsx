import { firebase, projectFirestore } from "../firebase/config";
import { User, ProjectType } from "../types/dashboard";

const converter = <T,>() => ({
  // toFirestore: (data: Partial<T>) => data,
  toFirestore: (data: T) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

const collectionPoint = <T,>(collectionPath: string) =>
  projectFirestore.collection(collectionPath).withConverter(converter<T>());

const documentPoint = <T,>(collectionPath: string, docId: string) =>
  projectFirestore
    .collection(collectionPath)
    .withConverter(converter<T>())
    .doc(docId);

const db = {
  users: collectionPoint<User>("users"),
  projects: collectionPoint<ProjectType>("projects"),
};

export { collectionPoint, documentPoint, db };
