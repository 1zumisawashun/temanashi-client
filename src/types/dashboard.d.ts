import { firebase } from "../firebase/config";

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

export type Project = {
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
