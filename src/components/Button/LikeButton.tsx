import {
  ProjectType,
  User,
  likedFurnitures,
  likedUsers,
} from "../../@types/dashboard";
import { FC, useState, useEffect } from "react";
import { timestamp, firebase } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import AddFavoriteIcon from "../../assets/icon/icon_add_favorite.svg";
import RemoveFavoriteIcon from "../../assets/icon/icon_remove_favorite.svg";
import { convertedPath } from "../../utilities/convertValue";
import { useSubDocument } from "../../hooks/useSubDocument";
import { ProductItem } from "../../utilities/stripeClient";

type Prop = {
  furniture: ProductItem;
};
type Id = {
  id: string;
};
type LikedUser = {
  documents: (likedUsers & Id) | undefined;
  error: string | null;
  referense: firebase.firestore.DocumentReference<likedUsers> | null;
};
type LikedFuritures = {
  documents: (likedFurnitures & Id) | undefined;
  error: string | null;
  referense: firebase.firestore.DocumentReference<likedFurnitures> | null;
};

const LikeButton: FC<Prop> = ({ furniture }) => {
  const [like, setLike] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const likedUser: LikedUser = useSubDocument<ProjectType, likedUsers>(
    convertedPath(`/products/${furniture.product.id}/liked_users/${user.uid}`)
  );

  const likedFurniture: LikedFuritures = useSubDocument<User, likedFurnitures>(
    convertedPath(`/users/${user.uid}/liked_furnitures/${furniture.product.id}`)
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

  const addLikedFurniture = () => {
    if (!likedFurniture.referense) return;
    likedFurniture.referense.set({
      liked_furniture: furniture,
      createdAt: timestamp.fromDate(new Date()),
    });
  };

  const removeLikedUser = () => {
    if (!likedFurniture.referense) return;
    likedFurniture.referense.delete();
  };

  const removeLikedFurniture = () => {
    if (!likedUser.referense) return;
    likedUser.referense.delete();
  };

  const handleClick = () => {
    setLike(!like);
    if (like === true) {
      // FIXME:バッチ書き込み処理なのか、同じ情報ならトップに持ってきてもいいかもしれない
      removeLikedUser();
      removeLikedFurniture();
    }
    if (like === false) {
      addLikedUser();
      addLikedFurniture();
    }
  };

  useEffect(() => {
    if (!likedFurniture.referense) return;
    const unsubscribe = likedFurniture.referense.onSnapshot(
      (snapshot) => {
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
  }, [likedFurniture.referense]);

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
