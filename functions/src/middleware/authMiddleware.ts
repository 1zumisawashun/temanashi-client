import { RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import { firebaseApp } from "../firebase";

type JWTPayloadType = {
  uid: string;
  name: string;
  expiresIn?: string;
};

export const createJWT: RequestHandler = (req, res) => {
  const { uid, name, expiresIn = "5m" } = req.body as JWTPayloadType;

  if (uid && name) {
    const payload = { uid, name };
    const token = jwt.sign(payload, "secret", {
      algorithm: "HS256",
      expiresIn,
    });
    res.status(200).json({ message: "create jwt", jwt: token });
  } else {
    res.status(400).json({ error: "Payloadが指定されていません。" });
  }
};

export const authenticateWithJWT: RequestHandler = (req, res, next) => {
  const tokenViaBaerer = req.headers.authorization;
  if (tokenViaBaerer) {
    try {
      const token = tokenViaBaerer.split(" ")[1];
      const jwtPayload = jwt.verify(token, "secret");
      req.jwtPayload = jwtPayload as JWTPayloadType;
      next();
    } catch (error) {
      res.status(401).json({ error: "認証に失敗しました。" });
    }
  } else {
    res.status(403).json({ error: "tokenが指定されていません。" });
  }
};

export const authenticateWithFirebase: RequestHandler = async (
  req,
  res,
  next
) => {
  const payload = req.jwtPayload;
  if (payload) {
    try {
      // firebaseのauth情報と照合する
      // console.log(`${payload.uid} を使用して ${payload.name} を照合する`);
      const user = await firebaseApp.auth().getUser(payload.uid);
      if (user.displayName && user.displayName === payload.name) {
        next();
      } else {
        res.status(401).send({ error: "認証に失敗しました。" });
      }
    } catch (error) {
      res.status(401).send({ error: "認証に失敗しました。" });
    }
  } else {
    res.status(403).send({ error: "アクセス権限がありません。" });
  }
};
