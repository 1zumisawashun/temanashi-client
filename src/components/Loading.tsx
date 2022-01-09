import { FC } from "react";
import Loader from "react-loader-spinner";
type Props = {
  message?: string;
};

const Loading: FC<Props> = ({ message }: Props) => {
  const scrollTop = (): number => {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  };
  const styles = { top: scrollTop() };

  return (
    <>
      <div className="overlay" style={styles}>
        <div className="wrapper">
          <Loader
            type="RevolvingDot"
            color="#84bcb4"
            height={100}
            width={100}
          />
          {message ? (
            <div className="message">
              <span className="animation type1">L</span>
              <span className="animation type2">o</span>
              <span className="animation type3">a</span>
              <span className="animation type4">d</span>
              <span className="animation type5">i</span>
              <span className="animation type6">n</span>
              <span className="animation type7">g</span>
              <span className="animation type8">.</span>
              <span className="animation type9">.</span>
              <span className="animation type10">.</span>
            </div>
          ) : (
            <div className="message">{message}</div>
          )}
        </div>
      </div>
    </>
  );
};
export default Loading;
