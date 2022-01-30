import { FC, useState } from "react";

type Prop = {
  add: Function;
  remove: Function;
  addText: string;
  removeText: string;
  priceIndex?: string;
};

const ToggleButton: FC<Prop> = ({
  add,
  remove,
  addText,
  removeText,
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
          onClick={() => [add(priceIndex, 1), handleToggle()]}
        >
          {addText}
        </button>
      )}
      {isSelected && (
        <button
          className="btn"
          onClick={() => [remove(priceIndex, 1), handleToggle()]}
        >
          {removeText}
        </button>
      )}
    </>
  );
};
export default ToggleButton;
