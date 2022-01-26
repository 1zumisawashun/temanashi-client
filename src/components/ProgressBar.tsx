import { FC, useState, useEffect } from "react";

type Props = {
  width: number;
  percent: number;
};

const ProgressBar: FC<Props> = ({ width, percent }) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setValue(percent * width);
  }, [width, percent]);

  return (
    <div className="progress-div" style={{ width: `${width}%` }}>
      <div style={{ width: `${value}%` }} className="progress" />
    </div>
  );
};

export default ProgressBar;
