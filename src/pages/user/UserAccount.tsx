import { FC, FormEvent } from "react";
import UserNavbar from "../../components/UserNavbar";
import { projectFunctions, isEmulating } from "../../firebase/config";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCookies } from "react-cookie";
import { useLogout } from "../../hooks/useLogout";
import { useHistory } from "react-router-dom";

type Response = {
  message: string;
  jwt: string;
};

const UserAccount: FC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");
  const [cookies, setCookie, removeCookie] = useCookies(["jwt", "productId"]);
  const { logout, isPending } = useLogout();
  const history = useHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    logout();
    history.push("/login");
  };

  const onCallTest = () => {
    const helloOnCall = projectFunctions.httpsCallable("helloOnCall");
    helloOnCall({ name: `shun` }).then((result) => {
      console.log(result.data);
    });
  };
  const onRequestTest = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL_EMULATOR}/helloOnRequest`
    );
    console.log(result, "result");
  };
  const getAxiosTest = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/hello`
    );
    console.log(result, "result");
  };
  const createJWT = async () => {
    const params = {
      uid: user.uid,
      name: user.displayName,
    };
    const result = await axios.post<Response>(
      `${process.env.REACT_APP_BASE_URL}/api/jwt`,
      params
    );
    setCookie("jwt", result.data.jwt, { path: "/" });
    console.log(result, "result");
    console.log(cookies, "cookies");
  };
  const verifyJWT = async () => {
    const headers = {
      Authorization: `Bearer ${cookies.jwt}`,
    };
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/jwt/check`,
      { headers }
    );
    console.log(result, "result");
  };

  const removeProductIdCookie = () => {
    removeCookie("productId", { path: "/" });
    console.log(cookies);
  };

  const emulatingTest = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL_EMULATOR}/api/hello`
      // `${process.env.REACT_APP_BASE_URL_EMULATOR}/helloOnRequest`
    );
    console.log(process.env.REACT_APP_BASE_URL_EMULATOR);
    console.log(result, "check on emulator");
  };
  return (
    <>
      <UserNavbar />
      <div className="user-container">
        <div className="inner">
          <button onClick={onCallTest} className="btn">
            OnCallTest
          </button>
          <button onClick={onRequestTest} className="btn">
            OnRequestTest
          </button>
          <button onClick={getAxiosTest} className="btn">
            GetAxiosTest
          </button>
          <button onClick={createJWT} className="btn">
            CreateJWT
          </button>
          <button onClick={verifyJWT} className="btn">
            verifyJWT
          </button>
          <button onClick={removeProductIdCookie} className="btn">
            removeProductIdCookie
          </button>
          {isEmulating && (
            <button onClick={emulatingTest} className="btn">
              emulatingTest
            </button>
          )}
          {!isEmulating && (
            <button onClick={emulatingTest} className="btn -disabled" disabled>
              not work emulating test...
            </button>
          )}

          {!isPending && (
            <button onClick={handleSubmit} className="btn">
              Logout
            </button>
          )}
          {isPending && (
            <button onClick={handleSubmit} className="btn -disabled" disabled>
              Logging out...
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default UserAccount;
