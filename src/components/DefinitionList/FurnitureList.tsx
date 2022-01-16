import { Link } from "react-router-dom";
import { FC, useState } from "react";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";

type Props = {
  productItems: Array<ProductItem>;
};

const FurnitureList: FC<Props> = ({ productItems }) => {
  const [isPendingBuy, setIsPendingBuy] = useState<boolean>(false);
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  const onClickBuy = async (priceId: string) => {
    console.log("on click buy");
    try {
      setIsPendingBuy(true);
      const uid = user.uid;
      if (!uid) return;
      const url = window.location.origin;
      await productUseCase.buy(uid, priceId, url);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${!!error.message ? error.message : error}`);
      }
    } finally {
      console.log("success");
      setIsPendingBuy(false);
    }
  };

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
              {Object.keys(item.prices).map((priceIndex) => (
                <div key={priceIndex}>
                  <div>{item.prices[priceIndex].unit_amount}</div>
                  <button
                    className="btn"
                    onClick={() => onClickBuy(priceIndex)}
                  >
                    購入
                  </button>
                </div>
              ))}
            </div>
          </Link>
        ))}
    </div>
  );
};
export default FurnitureList;
