import { FC } from "react";
import { projectFunctions } from "../../firebase/config";

const Cart: FC = () => {
  const sayHello = () => {
    const sayHello = projectFunctions.httpsCallable("sayHello");
    sayHello({ name: `shun` }).then((result) => {
      console.log(result.data);
    });
  };

  return (
    <>
      <div className="cart-container">
        <div className="inner">
          <button onClick={sayHello} className="btn">
            CloudFunctionsTest
          </button>
        </div>
      </div>
    </>
  );
};
export default Cart;
