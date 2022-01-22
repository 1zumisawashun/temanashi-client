import { FC } from "react";
import UserNavbar from "../../components/UserNavbar";
import { useSubCollection } from "../../hooks/useSubCollection";
import { convertedPath } from "../../utilities/convertValue";
import { User, likedFurnitures } from "../../types/dashboard";
import { useAuthContext } from "../../hooks/useAuthContext";
import FurnitureList from "../../components/DefinitionList/FurnitureList";
import { ProductItem } from "../../utilities/stripeClient";

const UserFavorite: FC = () => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");
  const { documents, error } = useSubCollection<User, likedFurnitures>(
    convertedPath(`/users/${user.uid}/liked_furnitures`)
  );

  // documentsの配列の中からliked_projectsを取り出す;
  const getLikedFurnitures = (
    documents: Array<likedFurnitures>
  ): Array<ProductItem> => {
    const likedFurnitures = documents.map((p) => {
      return p.liked_furniture;
    });
    return likedFurnitures;
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <UserNavbar />
      <div className="user-container">
        <div className="inner">
          {documents && (
            <FurnitureList productItems={getLikedFurnitures(documents)} />
          )}
        </div>
      </div>
    </>
  );
};
export default UserFavorite;
