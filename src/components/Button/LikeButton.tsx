import {
  ProjectType,
  User,
  likedProjects,
  likedUsers,
} from "../../types/dashboard";
import { FC, useState, useEffect } from "react";
import { timestamp, firebase } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import AddFavoriteIcon from "../../assets/icon/add_favorite.svg";
import RemoveFavoriteIcon from "../../assets/icon/remove_favorite.svg";
import { convertedPath } from "../../utilities/convertValue";
import { useSubDocument } from "../../hooks/useSubDocument";
import { useFirestore } from "../../hooks/useFirestore";

type Prop = {
  project: ProjectType;
};
type Id = {
  id: string;
};
type LikedUser = {
  documents: (likedUsers & Id) | undefined;
  error: string | null;
  referense: firebase.firestore.DocumentReference<likedUsers> | null;
};
type LikedProjects = {
  documents: (likedProjects & Id) | undefined;
  error: string | null;
  referense: firebase.firestore.DocumentReference<likedProjects> | null;
};

const LikeButton: FC<Prop> = ({ project }) => {
  const [like, setLike] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const likedUser: LikedUser = useSubDocument<ProjectType, likedUsers>(
    convertedPath(`projects/${project.id}/liked_users/${user.uid}`)
  );

  const likedProject: LikedProjects = useSubDocument<User, likedProjects>(
    convertedPath(`users/${user.uid}/liked_projects/${project.id}`)
  );

  const addLikedUser = () => {
    // NOTE:set中にconverterで定義している型と違う値を入れるとエラーになる
    if (!likedUser.referense) return;
    likedUser.referense.set({
      liked_user: {
        uid: user.uid,
        displayName: user.displayName,
      },
      createdAt: timestamp.fromDate(new Date()),
    });
  };

  const addLikedProject = () => {
    if (!likedProject.referense) return;
    likedProject.referense.set({
      liked_project: project,
      createdAt: timestamp.fromDate(new Date()),
    });
  };

  const removeLikedUser = () => {
    if (!likedProject.referense) return;
    likedProject.referense.delete();
  };

  const removeLikedProject = () => {
    if (!likedUser.referense) return;
    likedUser.referense.delete();
  };

  // NOTE:いいねの総数を出すために追加
  // NOTE:likeCountの型定義をnumberにするとエラーになる
  // FIXME:いいねするとカタつくのを直したい
  // 売り切れになったらエビデンスとして家具を残す
  // サブコレクションは削除の時にめんどくさい
  // いいねのコレクションでも関係は分ける

  const { updateDocument } = useFirestore();

  const countUp = () => {
    updateDocument("projects", project.id, {
      likedCount: firebase.firestore.FieldValue.increment(1),
    });
  };

  const countDown = () => {
    updateDocument("projects", project.id, {
      likedCount: firebase.firestore.FieldValue.increment(-1),
    });
  };

  const handleClick = () => {
    setLike(!like);
    if (like === true) {
      // バッチ書き込み処理なのか、同じ情報ならトップに持ってきてもいいかもしれない
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
    if (!likedProject.referense) return;
    const unsubscribe = likedProject.referense.onSnapshot(
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
  }, [likedProject.referense]);

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
