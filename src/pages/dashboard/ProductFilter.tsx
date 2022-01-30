import { FC } from "react";
const filterList: Array<string> = [
  "all",
  "development",
  "sales",
  "design",
  "marketing",
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
    <div className="project-filter">
      <nav>
        <p>FILTER BY</p>
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
