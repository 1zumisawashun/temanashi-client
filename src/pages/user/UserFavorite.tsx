import "./User.scss";
import { FC } from "react";
import UserNavbar from "../../components/UserNavbar";

const UserFavorite: FC = () => {
  return (
    <>
      <UserNavbar />
      <div className="user-container">
        <div className="inner">
          <p>favorite</p>
        </div>
      </div>
    </>
  );
};
export default UserFavorite;
