import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { documentPoint } from "../utilities/converter";
import { User } from "../@types/dashboard";
import { useToken } from "../hooks/useToken";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const { createJWT } = useToken();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      // nullチェックで早期リターン
      if (res.user === null) return;
      type addUser = Omit<User, "id">;
      // FIXME:関係ないプロパティも追加・更新できてしまう
      await documentPoint<addUser>("users", res.user.uid).update({
        online: true,
      });

      if (res.user.displayName === null) return;
      createJWT({ uid: res.user.uid, name: res.user.displayName });

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        if (err instanceof Error) {
          setError(err.message);
        }
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
};
