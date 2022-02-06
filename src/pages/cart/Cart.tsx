import { FC, useState } from "react";
import { line_item, productUseCase } from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCartDocument } from "../../hooks/useCartDocument";
import Loading from "../../components/Loading";
import InpuCheckbox from "../../components/Input/InputCheckbox";
import { useToken } from "../../hooks/useToken";
import { useLogout } from "../../hooks/useLogout";
import { useHistory } from "react-router-dom";
import CartList from "../../components/DefinitionList/CartList";

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
    let formatlineItems: any = [];
    let documentsLineItems: any = [];

    await documents.forEach((document: any) => {
      Object.keys(document.prices).forEach((priceIndex: string) => {
        documentsLineItems = [
          ...documentsLineItems,
          { price: priceIndex, quantity: 1 },
        ];
      });
    });

    if (line_items.length !== 0) {
      formatlineItems = line_items.reduce((acc, v) => {
        // @ts-ignore
        acc[v.price] = v;
        return acc;
      }, {});
    }

    const resultsLineItems: Array<line_item> = await documentsLineItems.map(
      (item: line_item) => {
        const lineItem = formatlineItems[item.price];
        if (lineItem) {
          return formatlineItems[item.price];
        }
        return item;
      }
    );
    console.log(resultsLineItems, "resultsLineItems");

    // NOTE:awaitをつけるとPromise<string>がstringになる
    const token = await verifyJWT();
    console.log(token);

    if (!token) {
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
      await productUseCase.buy(uid, resultsLineItems, seccess_url, cancel_url);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${!!error.message ? error.message : error}`);
      }
    } finally {
      setIsPendingBuy(false);
    }
  };

  const checkSameProduct = (price: string): Array<line_item> => {
    let result: Array<line_item> = [];
    line_items.forEach((item: line_item) => {
      if (item.price !== price) {
        result = [...result, item];
      }
    });
    return result;
  };

  const selectProduct = async (price: string, quantity: number) => {
    const lineItem: line_item = {
      price,
      quantity,
    };
    const checkedProduct = await checkSameProduct(price);
    const result = [...checkedProduct, lineItem];
    await setLinetems(result);
  };

  // これにcookieの処理も入れる
  const removeProduct = async (price: string) => {
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
      {isPendingBuy && <Loading />}
      {documents.length === 0 && <div>documentsの商品がありません。</div>}
      {documents.length !== 0 && (
        <CartList
          productItems={documents}
          selectProduct={selectProduct}
          removeProduct={removeProduct}
        />
      )}
      <div className="accept-block">
        <InpuCheckbox
          state={isAccepted}
          setState={setIsAccepted}
          text="利用規約・個人情報の取り扱いについて同意しますか？"
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
