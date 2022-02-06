import { Link } from "react-router-dom";
import { FC } from "react";
import {
  ProductItem,
  ProductItemWithoutComment,
} from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";
import { taxIncludedPrice } from "../../utilities/convertValue";

type Props = {
  productItems: Array<ProductItem | ProductItemWithoutComment>;
};

const FurnitureList: FC<Props> = ({ productItems }) => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  return (
    <div className="product-list">
      {productItems &&
        productItems.map((item: ProductItem | ProductItemWithoutComment) => (
          <>
            <Link
              to={`/furnitures/${item.product.id}`}
              key={item.product.id}
              className="wrapper"
            >
              <div className="thumbnail">
                {item.product.images.length > 0 ? (
                  <img src={item.product.images[0]} alt="" />
                ) : (
                  <img
                    src="https://placehold.jp/200x160.png"
                    alt=""
                    width="100"
                  />
                )}
              </div>
              <div className="content">
                <h4 className="name">{item.product.name}</h4>
                {Object.keys(item.prices).map((priceIndex) => (
                  <p key={priceIndex} className="price">
                    {taxIncludedPrice(item.prices[priceIndex].unit_amount)}
                  </p>
                ))}
                <div className="dimentions">
                  <ul>
                    <li>幅 111cm</li>
                    <li>深さ 222cm</li>
                    <li>高さ 333cm</li>
                  </ul>
                </div>
              </div>
            </Link>
          </>
        ))}
    </div>
  );
};
export default FurnitureList;