import { Link } from "react-router-dom";
import { FC } from "react";
import {
  ProductItem,
  ProductItemWithoutComment,
} from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";
import { taxIncludedPrice } from "../../utilities/convertValue";
import Counter from "../../components/Counter";

type Props = {
  productItems: Array<ProductItem | ProductItemWithoutComment>;
  selectProduct?: Function;
  removeProduct?: Function;
};

const CartList: FC<Props> = ({
  productItems,
  selectProduct,
  removeProduct,
}) => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  return (
    <div className="cart-list">
      {productItems &&
        productItems.map((item: ProductItem | ProductItemWithoutComment) => (
          <>
            <div className="wrapper">
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
                <Link
                  to={`/furnitures/${item.product.id}`}
                  key={item.product.id}
                >
                  <h4 className="name">{item.product.name}</h4>
                </Link>
                {Object.keys(item.prices).map((priceIndex) => (
                  <p key={priceIndex} className="price">
                    {taxIncludedPrice(item.prices[priceIndex].unit_amount)}
                  </p>
                ))}
              </div>
              {selectProduct &&
                removeProduct &&
                Object.keys(item.prices).map((priceIndex) => (
                  <div key={priceIndex}>
                    <Counter add={selectProduct} priceIndex={priceIndex} />
                  </div>
                ))}
            </div>
          </>
        ))}
    </div>
  );
};
export default CartList;
