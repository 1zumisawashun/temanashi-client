import { FC } from "react";
const filterList: Array<string> = [
  "all",
  "mine",
  "development",
  "sales",
  "design",
  "marketing",
];

type Props = {
  currentFilter: String;
  changeFilter: Function;
};

const ProjectFilter: FC<Props> = ({ currentFilter, changeFilter }) => {
  const handleClick = (newFilter: String) => {
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>FIlter by:</p>
        {filterList.map((f) => (
          // 無名関数にする理由は？→引数をとる際は無名関数にする
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

export default ProjectFilter;
