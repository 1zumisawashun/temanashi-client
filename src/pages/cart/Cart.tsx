import { FC, useEffect, useState } from "react";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFunctions } from "../../firebase/config";

const Cart: FC = () => {
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  const [isPending, setIsPending] = useState<boolean>(false);
  const [isPendingBuy, setIsPendingBuy] = useState<boolean>(false);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);

  const sayYeah = () => {
    const sayYeah = projectFunctions.httpsCallable("sayYeah");
    sayYeah({ name: `shun` }).then((result) => {
      console.log(result.data);
    });
  };

  const dammyImage = "https://placehold.jp/200x160.png";

  const addProduct = () => {
    const addProduct = projectFunctions.httpsCallable("addProduct");
    addProduct({
      width: 97,
      depth: 180,
      height: 50,
      price: 39900,
      baseColor: "white",
      subColor: "grey",
      stock: 4,
      likedCount: 23,
      category: "bed",
      name: "ベッド",
      imageUrl: dammyImage,
      details: "texttexttexttexttexttexttexttexttexttext",
      // createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    }).then((result) => {
      console.log(result.data);
    });
  };

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
      <div className="cart-container">
        {isPending && (
          <button className="btn" disabled>
            loading...
          </button>
        )}
        {isPendingBuy && (
          <button className="btn" disabled>
            loading...
          </button>
        )}
        <div className="inner">
          <p>history</p>
          <button onClick={sayYeah} className="btn">
            say yeah
          </button>
          <button onClick={addProduct} className="btn">
            add product
          </button>
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
export default Cart;
