import { firebase, projectFirestore } from "../firebase/config";
import { User, ProjectType } from "../types/dashboard";

const converter = <T,>() => ({
  // NOTE:toFirestore: (data: Partial<T>) => data,で曖昧にすることもできる
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

const subCollectionPoint = <T, U>(
  collectionPath: string,
  docId: string,
  subCollectionPath: string,
  subDocId: string
) =>
  projectFirestore
    .collection(collectionPath)
    .withConverter(converter<T>())
    .doc(docId)
    .collection(subCollectionPath)
    .withConverter(converter<U>())
    .doc(subDocId);

const db = {
  users: collectionPoint<User>("users"),
  projects: collectionPoint<ProjectType>("projects"),
};

export { collectionPoint, documentPoint, subCollectionPoint, db };
