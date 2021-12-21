import "./LikeButton.scss";
import {
  ProjectType,
  User,
  likedProjects,
  likedUsers,
} from "../types/dashboard";
import { FC, useState, useEffect } from "react";
import { timestamp, firebase } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { documentPoint, subCollectionPoint } from "../utilities/db";
import AddFavoriteIcon from "../assets/add_favorite.svg";
import RemoveFavoriteIcon from "../assets/remove_favorite.svg";

type Prop = {
  project: ProjectType;
};

const LikeButton: FC<Prop> = ({ project }: Prop) => {
  const [like, setLike] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  const projectSubCollectionRef = subCollectionPoint<ProjectType, likedUsers>(
    "projects",
    project.id,
    "liked_users",
    user.uid
  );

  const userSubCollectionRef = subCollectionPoint<User, likedProjects>(
    "users",
    user.uid,
    "liked_projects",
    project.id
  );

  const addLikedUser = () => {
    // NOTE:set中にconverterで定義している型と違う値を入れるとエラーになる
    projectSubCollectionRef.set({
      liked_user: {
        uid: user.uid,
        displayName: user.displayName,
      },
      createdAt: timestamp.fromDate(new Date()),
    });
  };

  const addLikedProject = () => {
    userSubCollectionRef.set({
      liked_project: project,
      createdAt: timestamp.fromDate(new Date()),
    });
  };

  const removeLikedUser = () => {
    projectSubCollectionRef.delete();
  };

  const removeLikedProject = () => {
    userSubCollectionRef.delete();
  };

  // NOTE:いいねの総数を出すために追加
  // NOTE:likeCountの型定義をnumberにするとエラーになる
  // FIXME:いいねするとカタつくのを直したい
  const countUp = () => {
    documentPoint<ProjectType>("projects", project.id).set(
      { likedCount: firebase.firestore.FieldValue.increment(1) },
      { merge: true }
    );
  };
  const countDown = () => {
    documentPoint<ProjectType>("projects", project.id).set(
      { likedCount: firebase.firestore.FieldValue.increment(-1) },
      { merge: true }
    );
  };

  const handleClick = () => {
    setLike(!like);
    if (like === true) {
      removeLikedUser();
      removeLikedProject();
      countDown();
    }
    if (like === false) {
      addLikedUser();
      addLikedProject();
      countUp();
    }
  };

  useEffect(() => {
    const unsubscribe = projectSubCollectionRef.onSnapshot(
      (snapshot) => {
        console.log(snapshot, "snapshot");
        if (snapshot.exists) {
          setLike(true);
        } else {
          setLike(false);
        }
      },
      (error) => {
        console.log(error);
        setError("could not push like button, try again");
      }
    );
    // unsubscribe on unmount and clean a function
    return () => unsubscribe();
  }, [projectSubCollectionRef]);

  return (
    <div className="like-button">
      <span onClick={handleClick} className="favorite">
        {like ? (
          <img src={AddFavoriteIcon} alt="" />
        ) : (
          <img src={RemoveFavoriteIcon} alt="" />
        )}
        {error && <div className="error">{error}</div>}
      </span>
    </div>
  );
};
export default LikeButton;
