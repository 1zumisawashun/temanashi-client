import { FC, useState } from "react";
import { line_item, productUseCase } from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCartDocument } from "../../hooks/useCartDocument";
import { Link } from "react-router-dom";
import { taxIncludedPrice } from "../../utilities/convertValue";
import Loading from "../../components/Loading";
import ToggleButton from "../../components/Button/ToggleButton";

const Cart: FC = () => {
  const [isPendingBuy, setIsPendingBuy] = useState<boolean>(false);
  const [line_items, setLinetems] = useState<Array<line_item>>([]);

  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const { documents } = useCartDocument();

  const onClickBuy = async () => {
    try {
      setIsPendingBuy(true);
      const uid = user.uid;
      const seccess_url = `${window.location.origin}/complete`;
      const cancel_url = `${window.location.origin}/error`;
      await productUseCase.buy(uid, line_items, seccess_url, cancel_url);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${!!error.message ? error.message : error}`);
      }
    } finally {
      setIsPendingBuy(false);
    }
  };

  const selectProduct = async (price: string, quantity: number) => {
    const lineItem: line_item = {
      price,
      quantity,
    };
    const newArray = [...line_items, lineItem];
    await setLinetems(newArray);
  };

  const removeProduct = async (price: string, quantity: number) => {
    const newArray = await line_items.filter((item: any) => {
      return item.price !== price;
    });
    await setLinetems(newArray);
  };

  return (
    <>
      {isPendingBuy && <Loading />}
      <button className="btn" onClick={onClickBuy}>
        購入する
      </button>
      <div className="diagnose-result-list">
        {documents &&
          documents.map((item: any) => (
            <>
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
                      <li>幅111cm</li>
                      <li>深さ222cm</li>
                      <li>高さ333cm</li>
                    </ul>
                  </div>
                </div>
              </Link>
              {Object.keys(item.prices).map((priceIndex) => (
                <div key={priceIndex}>
                  <ToggleButton
                    selectProduct={selectProduct}
                    removeProduct={removeProduct}
                    priceIndex={priceIndex}
                  />
                </div>
              ))}
            </>
          ))}
      </div>
    </>
  );
};
export default Cart;
