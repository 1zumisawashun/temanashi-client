import "./User.scss";
import { FC } from "react";
import UserNavbar from "../../components/UserNavbar";

const UserHistory: FC = () => {
  return (
    <>
      <UserNavbar />
      <div className="user-container">
        <div className="inner">
          <p>history</p>
        </div>
      </div>
    </>
  );
};
export default UserHistory;
