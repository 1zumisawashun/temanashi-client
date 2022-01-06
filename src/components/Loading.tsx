import { FC } from "react";
import Loader from "react-loader-spinner";

const Loading: FC = () => {
  return (
    <>
      <Loader type="RevolvingDot" color="#84bcb4" height={100} width={100} />
    </>
  );
};
export default Loading;
