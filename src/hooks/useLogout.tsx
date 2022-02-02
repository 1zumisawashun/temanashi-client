import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { documentPoint } from "../utilities/converter";
import { User } from "../@types/dashboard";
import { useToken } from "../hooks/useToken";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();
  const { removeJWT } = useToken();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      // update online status
      if (!user) throw new Error("we cant find your account");
      type addUser = Omit<User, "id">;
      // FIXME:関係ないプロパティも追加・更新できてしまう
      await documentPoint<addUser>("users", user.uid).update({
        online: false,
      });

      // sign the user out
      await projectAuth.signOut();

      // remove jwt in cookie
      removeJWT();

      // dispatch logout action
      dispatch({ type: "LOGOUT", payload: user });

      // update state
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

  return { logout, error, isPending };
};
