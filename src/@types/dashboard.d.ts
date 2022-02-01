import { firebase } from "../firebase/config";
import { ProductItem } from "../utilities/stripeClient";

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

export type likedFurnitures = {
  id?: string;
  liked_furniture: ProductItem;
  createdAt: firebase.firestore.Timestamp;
};

export type Furniture = {
  width: number; //幅
  depth: number; //奥行き
  height: number; //高さ
  price: number; //税抜価格(関数処理で税込カンマ付きできる)
  baseColor: string; //ベースカラー
  subColor: string; //サブカラー
  stock: number; //在庫
  likedCount: number; //いいね総数(クライアントではfirebase.firestore.FieldValue)
  category: string; //家具のカテゴリー
  name: string; //名前
  imageUrl: string; //画像のURL(配列の方が良い？)
  details: string; //詳細情報
  createdAt: firebase.firestore.Timestamp; //追加した日時
};

export type FurnitureType = {
  name: string; //名前
  mainImage: string; //メイン画像
  subImage: Array<string>; //サブ画像
  description: string; //詳細情報
  price: number; //税抜価格
  width: number; //幅
  depth: number; //奥行き
  height: number; //高さ
  category: string; //家具のカテゴリー
  likedCount: firebase.firestore.FieldValue; //いいね総数
  createdAt: firebase.firestore.Timestamp; //追加した日時
};

export type firebasePath = {
  collection: string;
  document: string;
  subCollection: string;
  subDocument: string;
};
