import { FC } from "react";

type Props = {
  src: string;
};

const Avatar: FC<Props> = ({ src }) => {
  return (
    <>
      {src && (
        <div className="avatar">
          <img src={src} alt="user avatar" />
        </div>
      )}
    </>
  );
};
export default Avatar;
