import { firebase } from "../firebase/config";

// 必ずしもprojectsかusersか不明なためanyにするconverterを導入した方が良い
export type UseCollection = {
  documents: Array<any> | null;
  error: string | null;
};

export type CreatedUser = {
  displayName: string | null;
  id: string;
  online?: boolean;
  photoURL?: string;
};

export type Comment = {
  displayName: string;
  photoURL?: string;
  content: string;
  createdAt: firebase.firestore.Timestamp;
  id: number;
};

export type CommentToAdd = {
  displayName: string;
  photoURL: string;
  content: string;
  createdAt: firebase.firestore.Timestamp;
  id: number;
};

export type ProjectType = {
  assignedUsersList: Array<CreatedUser>;
  category: string;
  comments: Array<Comment>;
  createdAt: firebase.firestore.Timestamp;
  createdBy: CreatedUser;
  details: string;
  dueDate: firebase.firestore.Timestamp;
  id: string;
  name: string;
};
