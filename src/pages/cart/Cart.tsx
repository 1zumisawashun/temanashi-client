import { FC, useState } from "react";
import { line_item, productUseCase } from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCartDocument } from "../../hooks/useCartDocument";
import { Link } from "react-router-dom";
import { taxIncludedPrice } from "../../utilities/convertValue";
import Loading from "../../components/Loading";
import ToggleButton from "../../components/Button/ToggleButton";
import InpuCheckbox from "../../components/Input/InputCheckbox";
import { useCookies } from "react-cookie";
import axios from "axios";

const Cart: FC = () => {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [isPendingBuy, setIsPendingBuy] = useState<boolean>(false);
  const [line_items, setLinetems] = useState<Array<line_item>>([]);
  const [cookies, setCookie] = useCookies(["jwt"]);

  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const { documents } = useCartDocument();

  const verifyJWT = async () => {
    const headers = {
      Authorization: `Bearer ${cookies.jwt}`,
    };
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/jwt/check`,
      { headers }
    );
    console.log(result, "===================");
    return result.data.message;
    // 恐らくエラーになるのはJWTのExpireが関係している
    // アラートを出すためにあえてnullを返したい
  };

  const onClickBuy = async () => {
    if (line_items.length === 0) {
      alert("購入する製品を選択してください");
      return;
    }
    // NOTE:awaitをつけるとPromise<string>がstringになる
    const result = await verifyJWT();
    if (!result) {
      alert("認証ユーザーではありません");
      return;
    }
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

  const handleAlert = () => {
    alert("利用規約に同意してください");
  };

  return (
    <div className="cart-container">
      {!documents && <Loading />}
      {isPendingBuy && <Loading />}
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
                    add={selectProduct}
                    remove={removeProduct}
                    addText="選択する"
                    removeText="取り消す"
                    priceIndex={priceIndex}
                  />
                </div>
              ))}
            </>
          ))}
      </div>
      <div className="accept-block">
        <InpuCheckbox
          state={isAccepted}
          setState={setIsAccepted}
          text="利用規約に同意しますか？"
        />
        {isAccepted && (
          <button className="btn" onClick={onClickBuy}>
            購入する
          </button>
        )}
        {!isAccepted && (
          <button className="btn -disabled" onClick={handleAlert}>
            購入する
          </button>
        )}
      </div>
    </div>
  );
};
export default Cart;
