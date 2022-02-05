import { FC, useState } from "react";
import { line_item, productUseCase } from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCartDocument } from "../../hooks/useCartDocument";
import Loading from "../../components/Loading";
import InpuCheckbox from "../../components/Input/InputCheckbox";
import { useToken } from "../../hooks/useToken";
import { useLogout } from "../../hooks/useLogout";
import { useHistory } from "react-router-dom";
import ProductList from "../../components/DefinitionList/ProductList";

const Cart: FC = () => {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [isPendingBuy, setIsPendingBuy] = useState<boolean>(false);
  const [line_items, setLinetems] = useState<Array<line_item>>([]);
  const { verifyJWT } = useToken();
  const { logout } = useLogout();
  const history = useHistory();

  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const { documents } = useCartDocument();

  const onClickBuy = async () => {
    if (line_items.length === 0) {
      alert("購入する製品を選択してください");
      return;
    }
    // NOTE:awaitをつけるとPromise<string>がstringになる
    const result = await verifyJWT();
    console.log(result);

    if (!result) {
      alert("認証トークンが有効期限切れです。ログインしなおしてください。");
      logout();
      history.push("/login");
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
    <div className="common-container">
      {!documents && <Loading />}
      {isPendingBuy && <Loading />}
      {documents && (
        <ProductList
          productItems={documents}
          selectProduct={selectProduct}
          removeProduct={removeProduct}
        />
      )}
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
