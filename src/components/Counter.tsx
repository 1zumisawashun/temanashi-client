import { FC, useState } from "react";
import AddIcon from "../assets/icon/icon_add.svg";
import RemoveIcon from "../assets/icon/icon_remove.svg";

type Prop = {
  add: Function;
  priceIndex: string;
};

const Counter: FC<Prop> = ({ add, priceIndex }) => {
  const [count, setCount] = useState<number>(1);
  const [isIncrementActive, setIsIncrementActive] = useState<boolean>(false);
  const [isDecrementActive, setIsDecrementActive] = useState<boolean>(true);

  // NOTE:増減1~5までを仮として設定する
  const incrementCount = (increment: number) => {
    setCount(count + increment);
    if (count !== 1 || 2) {
      setIsDecrementActive(false);
    }
    if (count === 4) {
      setIsIncrementActive(true);
    }
    add(priceIndex, count + increment);
  };
  const decreaseCount = (decrement: number) => {
    setCount(count + decrement);
    if (count + decrement === 1) {
      setIsDecrementActive(true);
    }
    if (count !== 4) {
      setIsIncrementActive(false);
    }
    add(priceIndex, count + decrement);
  };

  return (
    <div className="counter-container">
      <button
        onClick={() => decreaseCount(-1)}
        disabled={isDecrementActive}
        className="counter"
      >
        <img src={RemoveIcon} alt="remove icon" />
      </button>
      <span className="count">{count}</span>
      <button
        onClick={() => incrementCount(1)}
        disabled={isIncrementActive}
        className="counter"
      >
        <img src={AddIcon} alt="add icon" />
      </button>
    </div>
  );
};

export default Counter;
