import { FC } from "react";
import UserNavbar from "../../components/UserNavbar";
import { useSubCollection } from "../../hooks/useSubCollection";
import { convertedPath } from "../../utilities/convertValue";
import { User, likedProjects, ProjectType } from "../../types/dashboard";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProjectList from "../../components/ProjectList";

const UserFavorite: FC = () => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");
  const { documents, error } = useSubCollection<User, likedProjects>(
    convertedPath(`/users/${user.uid}/liked_projects`)
  );

  //documentsの配列の中からliked_projectsを取り出す
  const getLikedProjects = (
    documents: Array<likedProjects>
  ): Array<ProjectType> => {
    const likedProjects = documents.map((p) => {
      return p.liked_project;
    });
    return likedProjects;
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <UserNavbar />
      <div className="user-container">
        <div className="inner">
          {documents && <ProjectList projects={getLikedProjects(documents)} />}
        </div>
      </div>
    </>
  );
};
export default UserFavorite;
