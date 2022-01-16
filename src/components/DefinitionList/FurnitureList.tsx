import { Link } from "react-router-dom";
import { FC, useState } from "react";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";

type Props = {
  productItems: Array<ProductItem>;
};

const FurnitureList: FC<Props> = ({ productItems }) => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  return (
    <div className="project-list">
      {productItems &&
        productItems.map((item: ProductItem) => (
          <Link to={`/furnitures/${item.product.id}`} key={item.product.id}>
            <div className="image-box">
              {item.product.images.length > 0 ? (
                <img src={item.product.images[0]} alt="" width="100" />
              ) : (
                <img
                  src="https://placehold.jp/200x160.png"
                  alt=""
                  width="100"
                />
              )}
            </div>
            <div>
              <h4>{item.product.name}</h4>
            </div>
          </Link>
        ))}
    </div>
  );
};
export default FurnitureList;
