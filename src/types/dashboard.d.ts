export type UseCollection = {
  documents: Array<Document>;
  error: String;
};

export type TimeStamp = {
  nanoseconds: number;
  seconds: number;
};

export type CreatedBy = {
  displayName: String;
  id: String;
  photoURL: String;
};

export type Comments = {
  content: String;
  createdAt: TimeStamp;
  displayName: String;
  id: Number;
};

export type Document = {
  assignedUsersList: Array<CreatedBy>;
  category: String;
  comments: Array<Comments>;
  createdAt: TimeStamp;
  createdBy: CreatedBy;
  details: String;
  dueDate: TimeStamp;
  id: String;
  name: String;
};
