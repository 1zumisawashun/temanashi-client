import { Link } from "react-router-dom";
import { FC } from "react";
import {
  ProductItem,
  ProductItemWithoutComment,
} from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";
import { taxIncludedPrice } from "../../utilities/convertValue";
import Counter from "../../components/Counter";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import Divider from "../../components/Divider";
import DeleteIcon from "../../assets/icon/icon_delete.svg";

type Props = {
  productItems: Array<ProductItem | ProductItemWithoutComment>;
  selectProduct: Function;
  removeProduct: Function;
};

const CartList: FC<Props> = ({
  productItems,
  selectProduct,
  removeProduct,
}) => {
  const [cookies, setCookie] = useCookies(["productId"]);
  const { user } = useAuthContext();
  const history = useHistory();

  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  const HandleRemove = async (productId: string, priceId: string) => {
    const result: Array<string> = await cookies.productId.filter(
      (item: string) => {
        return item !== productId;
      }
    );
    setCookie("productId", result);
    removeProduct(priceId);

    // NOTE:全て削除されたたらdashboardにリダイレクトさせる
    if (result.length === 0) {
      history.push(`/`);
    }
  };

  return (
    <div className="cart-list">
      {productItems &&
        productItems.map((item: ProductItem | ProductItemWithoutComment) => (
          <>
            <div className="wrapper">
              <Link
                to={`/furnitures/${item.product.id}`}
                key={item.product.id}
                className="thumbnail"
              >
                {item.product.images.length > 0 ? (
                  <img src={item.product.images[0]} alt="" />
                ) : (
                  <img
                    src="https://placehold.jp/200x160.png"
                    alt=""
                    width="100"
                  />
                )}
              </Link>
              <div className="content">
                {Object.keys(item.prices).map((priceIndex) => (
                  <>
                    <div key={item.product.id} className="details">
                      <p className="name">
                        {item.product.name}
                        <span key={priceIndex} className="price">
                          {taxIncludedPrice(
                            item.prices[priceIndex].unit_amount
                          )}
                        </span>
                      </p>

                      <div key={priceIndex} className="btnarea">
                        <Counter add={selectProduct} priceIndex={priceIndex} />
                      </div>
                    </div>
                    <div>
                      <img
                        src={DeleteIcon}
                        alt=""
                        className="delete-icon"
                        onClick={() =>
                          HandleRemove(item.product.id, priceIndex)
                        }
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
            <Divider />
          </>
        ))}
    </div>
  );
};
export default CartList;
