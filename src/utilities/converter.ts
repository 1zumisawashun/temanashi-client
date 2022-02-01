import { firebase, projectFirestore } from "../firebase/config";
import { User, ProjectType } from "../@types/dashboard";

const converter = <T>() => ({
  // NOTE:toFirestore: (data: Partial<T>) => data,で曖昧にすることもできる
  toFirestore: (data: T) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

const collectionPoint = <T>(collection: string) =>
  projectFirestore.collection(collection).withConverter(converter<T>());

const documentPoint = <T>(collection: string, document: string) =>
  projectFirestore
    .collection(collection)
    .withConverter(converter<T>())
    .doc(document);

const subCollectionPoint = <T, U>(
  collection: string,
  document: string,
  subCollection: string
) =>
  projectFirestore
    .collection(collection)
    .withConverter(converter<T>())
    .doc(document)
    .collection(subCollection)
    .withConverter(converter<U>());

const subDocumentPoint = <T, U>(
  collection: string,
  document: string,
  subCollection: string,
  subDocument: string
) =>
  projectFirestore
    .collection(collection)
    .withConverter(converter<T>())
    .doc(document)
    .collection(subCollection)
    .withConverter(converter<U>())
    .doc(subDocument);

const db = {
  users: collectionPoint<User>("users"),
  projects: collectionPoint<ProjectType>("projects"),
};

export {
  collectionPoint,
  documentPoint,
  subCollectionPoint,
  subDocumentPoint,
  db,
};
