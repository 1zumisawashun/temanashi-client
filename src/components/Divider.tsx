import { FC } from "react";

type Props = {
  styleName?: string;
};

const Divider: FC<Props> = ({ styleName }) => {
  return (
    <>
      <div className={`divider ${styleName}`} />
    </>
  );
};
export default Divider;
