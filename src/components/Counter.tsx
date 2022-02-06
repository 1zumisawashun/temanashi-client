import { FC, useState } from "react";

type Prop = {
  add: Function;
  priceIndex: string;
};

const Counter: FC<Prop> = ({ add, priceIndex }) => {
  const [count, setCount] = useState<number>(1);
  const [isIncrementActive, setIsIncrementActive] = useState<boolean>(false);
  const [isDecrementActive, setIsDecrementActive] = useState<boolean>(false);

  // NOTE:増減1~5までを仮として設定する
  const incrementCount = (increment: number) => {
    setCount(count + increment);
    if (count !== 2) {
      setIsDecrementActive(false);
    }
    if (count === 4) {
      setIsIncrementActive(true);
    }
    add(priceIndex, count);
  };
  const decreaseCount = (decrement: number) => {
    setCount(count + decrement);
    if (count === 2) {
      setIsDecrementActive(true);
    }
    if (count !== 4) {
      setIsIncrementActive(false);
    }
    add(priceIndex, count);
  };

  return (
    <div>
      <button
        onClick={() => incrementCount(1)}
        disabled={isIncrementActive}
        className="btn"
      >
        +
      </button>
      <span>{count}</span>
      <button
        onClick={() => decreaseCount(-1)}
        disabled={isDecrementActive}
        className="btn"
      >
        -
      </button>
    </div>
  );
};

export default Counter;
