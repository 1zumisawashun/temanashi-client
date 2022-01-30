import { FC } from "react";
import UserNavbar from "../../components/UserNavbar";
import { projectFunctions } from "../../firebase/config";
import axios from "axios";

const UserAccount: FC = () => {
  const onCallTest = () => {
    const helloOnCall = projectFunctions.httpsCallable("helloOnCall");
    helloOnCall({ name: `shun` }).then((result) => {
      console.log(result.data);
    });
  };
  const onRequestTest = async () => {
    const url = "https://us-central1-temanashi-39b3f.cloudfunctions.net";
    if (!url) return;
    const result = await axios.get(`${url}/helloOnRequest`);
    console.log(result, "result");
  };
  const getAxiosTest = async () => {
    const url = "https://us-central1-temanashi-39b3f.cloudfunctions.net";
    if (!url) return;
    const result = await axios.get(`${url}/api/hello`);
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
        </div>
      </div>
    </>
  );
};
export default UserAccount;
