import { firebase, projectFirestore } from "../firebase/config";
import { CreatedUser, ProjectType } from "../types/dashboard";
// Import or define your types
// import { YourType } from '~/@types'
const converter = <T,>() => ({
  toFirestore: (data: Partial<T>) => data,
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
  // list your collections here
  users: collectionPoint<CreatedUser>("users"),
  projects: collectionPoint<ProjectType>("prohects"),
};

export { collectionPoint, documentPoint, db };
