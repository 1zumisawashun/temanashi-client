import { firebase } from "../firebase/config";

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

const dammyImage = "https://placehold.jp/200x160.png";
const dammyMainImage = "https://placehold.jp/750x460.png";

export const recommendation: Furniture = {
  width: 97,
  depth: 180,
  height: 50,
  price: 39900,
  baseColor: "white",
  subColor: "grey",
  stock: 4,
  likedCount: 23,
  category: "bed",
  name: "ベッド",
  imageUrl: dammyMainImage,
  details:
    "ドライフラワーと照明が特徴的なワンルームの一人暮らしインテリア。テキトタイルはグレー系で揃えられ、IKEAの毛布やサイドテーブル、照明などで特徴立たせている、シンプルな雰囲気のお部屋。",
  createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
};

export const db: Array<Furniture> = [
  {
    width: 97,
    depth: 180,
    height: 50,
    price: 39900,
    baseColor: "white",
    subColor: "grey",
    stock: 4,
    likedCount: 23,
    category: "bed",
    name: "ベッド",
    imageUrl: dammyImage,
    details: "texttexttexttexttexttexttexttexttexttext",
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  },
  {
    width: 40,
    depth: 40,
    height: 60,
    price: 4999,
    baseColor: "white",
    subColor: "grey",
    stock: 19,
    likedCount: 2,
    category: "table",
    name: "テーブル",
    imageUrl: dammyImage,
    details: "texttexttexttexttexttexttexttexttexttext",
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  },
  {
    width: 95,
    depth: 64,
    height: 68,
    price: 10990,
    baseColor: "white",
    subColor: "grey",
    stock: 6,
    likedCount: 33,
    category: "sofa",
    name: "ソファ",
    imageUrl: dammyImage,
    details: "texttexttexttexttexttexttexttexttexttext",
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  },
  {
    width: 132,
    depth: 0,
    height: 38,
    price: 20280,
    baseColor: "white",
    subColor: "grey",
    stock: 3,
    likedCount: 1,
    category: "light",
    name: "間接照明",
    imageUrl: dammyImage,
    details: "texttexttexttexttexttexttexttexttexttext",
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  },
  {
    width: 130,
    depth: 190,
    height: 0,
    price: 4620,
    baseColor: "white",
    subColor: "grey",
    stock: 4,
    likedCount: 12,
    category: "carpet",
    name: "ラグ",
    imageUrl: dammyImage,
    details: "texttexttexttexttexttexttexttexttexttext",
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  },
  {
    width: 85,
    depth: 55,
    height: 0,
    price: 4999,
    baseColor: "white",
    subColor: "grey",
    stock: 4,
    likedCount: 12,
    category: "bed",
    name: "毛布",
    imageUrl: dammyImage,
    details: "texttexttexttexttexttexttexttexttexttext",
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  },
  {
    width: 70,
    depth: 25,
    height: 70,
    price: 7000,
    baseColor: "white",
    subColor: "grey",
    stock: 432,
    likedCount: 123,
    category: "shelf",
    name: "ラック",
    imageUrl: dammyImage,
    details: "texttexttexttexttexttexttexttexttexttext",
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  },
  {
    width: 55,
    depth: 60,
    height: 150,
    price: 15176,
    baseColor: "white",
    subColor: "grey",
    stock: 9,
    likedCount: 81,
    category: "plant",
    name: "観葉植物",
    imageUrl: dammyImage,
    details: "texttexttexttexttexttexttexttexttexttext",
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  },
];
