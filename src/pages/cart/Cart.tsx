import { FC, useEffect, useState } from "react";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import { projectFunctions } from "../../firebase/config";
import Loading from "../../components/Loading";
import FurnitureList from "../../components/DefinitionList/FurnitureList";

const Cart: FC = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);

  const sayHello = () => {
    const sayHello = projectFunctions.httpsCallable("sayHello");
    sayHello({ name: `shun` }).then((result) => {
      console.log(result.data);
    });
  };

  const fetchProducts = async () => {
    try {
      setIsPending(true);
      const productItems = await productUseCase.fetchAll();
      setProductItems(productItems);
      console.log(productItems, "productItem");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="cart-container">
        {isPending && <Loading />}
        <div className="inner">
          <button onClick={sayHello} className="btn">
            CloudFunctionsTest
          </button>
        </div>
        {productItems && <FurnitureList productItems={productItems} />}
      </div>
    </>
  );
};
export default Cart;
