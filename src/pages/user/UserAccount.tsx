import { FC } from "react";
import UserNavbar from "../../components/UserNavbar";
import { projectFunctions } from "../../firebase/config";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCookies } from "react-cookie";

type Response = {
  message: string;
  jwt: string;
};

const UserAccount: FC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");
  const [cookies, setCookie] = useCookies();

  const onCallTest = () => {
    const helloOnCall = projectFunctions.httpsCallable("helloOnCall");
    helloOnCall({ name: `shun` }).then((result) => {
      console.log(result.data);
    });
  };
  const onRequestTest = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/helloOnRequest`
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
    setCookie("jwt", result.data.jwt);
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
        </div>
      </div>
    </>
  );
};
export default UserAccount;
