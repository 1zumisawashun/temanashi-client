import "./User.scss";
import { FC, useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";

const UserHistory: FC = () => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  const [isPending, setIsPending] = useState<boolean>(false);
  const [isPendingBuy, setIsPendingBuy] = useState<boolean>(false);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);

  const fetchProducts = async () => {
    try {
      setIsPending(true);
      const productItems = await productUseCase.fetchAll();
      setProductItems(productItems);
      console.log(productItems, "================");
    } finally {
      setIsPending(false);
    }
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <UserNavbar />
      <div className="user-container">
        {isPending && <div className="error">ERROR</div>}
        {isPendingBuy && <div className="error">BUY ERROR</div>}
        <div className="inner">
          <p>history</p>
          {productItems &&
            productItems.map((item) => (
              <div key={item.product.name}>
                <div>{item.product.name}</div>
                <div>
                  {Object.keys(item.prices).map((priceIndex) => (
                    <div key={priceIndex}>
                      <div>{item.prices[priceIndex].unit_amount}</div>
                      <button
                        className="btn"
                        onClick={() => onClickBuy(priceIndex)}
                      >
                        購入する
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default UserHistory;
