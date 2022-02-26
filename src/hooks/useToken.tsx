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

  const verifyJWT = async (): Promise<string | null> => {
    try {
      const headers = {
        Authorization: `Bearer ${cookies.jwt}`,
      };
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/jwt/check`,
        { headers }
      );
      return result.data.message; // Promise.resolveを返す
    } catch (error) {
      return null; // Promise.rejectを返す
    }
  };

  const removeJWT = () => {
    removeCookie("jwt", { path: "/" });
  };

  return { verifyJWT, createJWT, removeJWT };
};
