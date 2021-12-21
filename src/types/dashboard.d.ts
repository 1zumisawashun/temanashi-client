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
  likedCount?: firebase.firestore.FieldValue; //初期値としては追加されていないためoptional-chine
};

export type likedUsers = {
  liked_user: {
    uid: string;
    displayName: string;
  };
  createdAt: firebase.firestore.Timestamp;
};

export type likedProjects = {
  liked_project: ProjectType;
  createdAt: firebase.firestore.Timestamp;
};
