import { useCookies } from "react-cookie";
import axios from "axios";

type Response = {
  message: string;
  jwt: string;
};

type Params = {
  uid: string;
  name: string;
};

export const useToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  const createJWT = async (params: Params) => {
    const result = await axios.post<Response>(
      `${process.env.REACT_APP_BASE_URL}/api/jwt`,
      params
    );
    console.log(result, "createJWT");
    setCookie("jwt", result.data.jwt, { path: "/" });
  };

  const verifyJWT = (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = {
          Authorization: `Bearer ${cookies.jwt}`,
        };
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/jwt/check`,
          { headers }
        );
        return resolve(result.data.message);
      } catch (error) {
        return reject("トークンが有効期限切れです。再ログインしてください。");
      }
    });
  };

  const removeJWT = async () => {
    await removeCookie("jwt", { path: "/" });
  };

  return { verifyJWT, createJWT, removeJWT };
};
