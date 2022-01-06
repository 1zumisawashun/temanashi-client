// import "./User.scss";
import { FC } from "react";
import UserNavbar from "../../components/UserNavbar";

const UserAccount: FC = () => {
  return (
    <>
      <UserNavbar />
      <div className="user-container">
        <div className="inner">
          <p>account</p>
        </div>
      </div>
    </>
  );
};
export default UserAccount;
