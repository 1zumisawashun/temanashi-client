import { FC } from "react";
const filterList: Array<string> = [
  "all",
  "bed",
  "blanket",
  "chair",
  "lamp",
  "plant",
  "rug",
  "table",
  "shelf",
  "sofa",
];

type Props = {
  currentFilter: String;
  changeFilter: Function;
};

const ProductFilter: FC<Props> = ({ currentFilter, changeFilter }) => {
  const handleClick = (newFilter: String) => {
    changeFilter(newFilter);
  };
  return (
    <div className="product-filter-container">
      <nav>
        <p className="title">FILTER BY</p>
        {filterList.map((f) => (
          <button
            key={f}
            onClick={() => handleClick(f)}
            className={currentFilter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProductFilter;
