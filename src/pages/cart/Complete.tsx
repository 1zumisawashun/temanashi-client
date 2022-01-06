// import "./Complete.scss";

// import "./User.scss";
import { FC } from "react";
import UserNavbar from "../../components/UserNavbar";
import { useAuthContext } from "../../hooks/useAuthContext";

const Complete: FC = () => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  return (
    <>
      <UserNavbar />
      <div className="user-container">
        <div className="inner">complete</div>
      </div>
    </>
  );
};
export default Complete;
