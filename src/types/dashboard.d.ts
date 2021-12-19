import { firebase } from "../firebase/config";

// NOTE:CreatedByなどAssignedUserで使うためidを付与
export type User = {
  displayName: string | null;
  id: string;
  online: boolean;
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
  assignedUsersList: Array<User>;
  category: string;
  comments: Array<Comment>;
  createdAt: firebase.firestore.Timestamp;
  createdBy: User;
  details: string;
  dueDate: firebase.firestore.Timestamp;
  id: string;
  name: string;
};
