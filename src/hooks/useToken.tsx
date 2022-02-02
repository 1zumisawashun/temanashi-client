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

  const verifyJWT = async () => {
    const headers = {
      Authorization: `Bearer ${cookies.jwt}`,
    };

    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/jwt/check`,
        { headers }
      );
      console.log(result, "verifyJWT");
      return result.data.message;
    } catch (error) {
      console.log(error);
    }
    // NOTE:JWTの有効期限切れでエラーになる
  };

  const removeJWT = async () => {
    await removeCookie("jwt", { path: "/" });
  };

  return { verifyJWT, createJWT, removeJWT };
};
