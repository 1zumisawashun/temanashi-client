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
            <div className="message">{message}</div>
          ) : (
            <div className="message">Loading</div>
          )}
        </div>
      </div>
    </>
  );
};
export default Loading;
