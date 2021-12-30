import { firebase } from "../firebase/config";

// NOTE:CreatedByなどAssignedUserで使うためidを付与
export type User = {
  displayName: firebase.UserInfo.displayName;
  id?: string;
  online: boolean;
  photoURL: firebase.UserInfo.photoURL;
};

export type Comment = {
  displayName: firebase.UserInfo.displayName;
  photoURL: firebase.UserInfo.photoURL;
  content: string;
  createdAt: firebase.firestore.Timestamp;
  id: number;
};

export type CommentToAdd = {
  displayName: firebase.UserInfo.displayName;
  photoURL: firebase.UserInfo.photoURL;
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
  likedCount: firebase.firestore.FieldValue; //初期値としては追加されていないためoptional-chine
};

export type likedUsers = {
  liked_user: {
    uid: firebase.UserInfo.uid;
    displayName: firebase.UserInfo.displayName;
  };
  createdAt: firebase.firestore.Timestamp;
};

export type likedProjects = {
  id?: string;
  liked_project: ProjectType;
  createdAt: firebase.firestore.Timestamp;
};
