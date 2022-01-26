import { Link } from "react-router-dom";
import { FC } from "react";
import { ProductItem } from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";
import { taxIncludedPrice } from "../../utilities/convertValue";

type Props = {
  productItems: Array<ProductItem>;
};

const FurnitureList: FC<Props> = ({ productItems }) => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  return (
    <div className="diagnose-result-list">
      {productItems &&
        productItems.map((item: ProductItem) => (
          <Link to={`/furnitures/${item.product.id}`} key={item.product.id}>
            <div className="image-box">
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
            <div className="content-box">
              <h4>{item.product.name}</h4>
              {Object.keys(item.prices).map((priceIndex) => (
                <p key={priceIndex}>
                  {taxIncludedPrice(item.prices[priceIndex].unit_amount)}
                </p>
              ))}
              <div className="assigned-to">
                <ul>
                  {/* <li>幅{item.metadata.width}cm</li>
                    <li>深さ{item.metadata.depth}cm</li>
                    <li>高さ{item.metadata.height}cm</li> */}
                  <li>幅111cm</li>
                  <li>深さ222cm</li>
                  <li>高さ333cm</li>
                </ul>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};
export default FurnitureList;
