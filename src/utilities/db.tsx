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

const subCollectionPoint = <T, U>(firebasePath: Array<string>) =>
  projectFirestore
    .collection(firebasePath[0])
    .withConverter(converter<T>())
    .doc(firebasePath[1])
    .collection(firebasePath[2])
    .withConverter(converter<U>())
    .doc(firebasePath[3]);

const db = {
  users: collectionPoint<User>("users"),
  projects: collectionPoint<ProjectType>("projects"),
};

export { collectionPoint, documentPoint, subCollectionPoint, db };
