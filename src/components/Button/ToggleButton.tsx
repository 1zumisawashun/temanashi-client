import { FC, useState } from "react";

type Prop = {
  selectProduct: Function;
  removeProduct: Function;
  priceIndex: string;
};

const ToggleButton: FC<Prop> = ({
  selectProduct,
  removeProduct,
  priceIndex,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const handleToggle = () => {
    setIsSelected(!isSelected);
  };

  return (
    <>
      {!isSelected && (
        <button
          className="btn"
          onClick={() => [selectProduct(priceIndex, 1), handleToggle()]}
        >
          選択する
        </button>
      )}
      {isSelected && (
        <button
          className="btn"
          onClick={() => [removeProduct(priceIndex, 1), handleToggle()]}
        >
          取り消し
        </button>
      )}
    </>
  );
};
export default ToggleButton;
