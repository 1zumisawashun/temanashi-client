import "./User.scss";
import { FC } from "react";
import UserNavbar from "../../components/UserNavbar";
import { useSubCollection } from "../../hooks/useSubCollection";
import { convertedPath } from "../../utilities/convertPath";
import { User, ProjectType } from "../../types/dashboard";
import { useAuthContext } from "../../hooks/useAuthContext";

const UserFavorite: FC = () => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");
  const { documents, error } = useSubCollection<User, ProjectType>(
    convertedPath(`/users/${user.uid}/liked_projects`)
  );
  console.log(documents, "documents");
  console.log(error);

  return (
    <>
      <UserNavbar />
      <div className="user-container">
        <div className="inner">
          <p>favorite</p>
          {error && <div className="error">{error}</div>}
          {documents &&
            documents.map((project) => <p key={project.id}>{project.id}</p>)}
        </div>
      </div>
    </>
  );
};
export default UserFavorite;
