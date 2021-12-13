export type UseCollection = {
  documents: Array<Document>;
  error: String;
};

// export type TimeStamp = {
//   nanoseconds: number;
//   seconds: number;
// };

export type CreatedBy = {
  displayName: String;
  id: string;
  online?: boolean;
  photoURL: string;
};

export type Comments = {
  content: String;
  createdAt: TimeStamp;
  displayName: String;
  id: number;
  photoURL?: string;
};

export type Comment = {
  content: String;
  createdAt: Date;
  displayName: String;
  id: number;
  photoURL?: string;
};

// FIXME:Documentに合わせてPickする
export type Project = {
  assignedUsersList: Array<CreatedBy>;
  category: String;
  //Commentが異なる
  comments: Array<Comment>;
  createdAt: any;
  createdBy: CreatedBy;
  details: String;
  dueDate: any;
  id: string;
  name: String;
};

export type Document = {
  assignedUsersList: Array<CreatedBy>;
  category: String;
  //Commentsが異なる
  comments: Array<Comments>;
  createdAt: TimeStamp;
  createdBy: CreatedBy;
  details: String;
  dueDate: TimeStamp;
  id: string;
  name: String;
};
