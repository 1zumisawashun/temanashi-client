import { FC } from "react";
import { projectFunctions } from "../../firebase/config";
import axios from "axios";

const Cart: FC = () => {
  const test1 = () => {
    const sayHello = projectFunctions.httpsCallable("sayHello");
    sayHello({ name: `shun` }).then((result) => {
      console.log(result.data);
    });
  };
  const test2 = async () => {
    const url = "https://us-central1-temanashi-39b3f.cloudfunctions.net";
    if (!url) return;
    const result = await axios.get(`${url}/api/hello-json`);
    console.log(result, "result");
  };

  return (
    <>
      <div className="cart-container">
        <div className="inner">
          <button onClick={test1} className="btn">
            CloudFunctionsTest
          </button>
          <button onClick={test2} className="btn">
            AxiosTest
          </button>
        </div>
      </div>
    </>
  );
};
export default Cart;
