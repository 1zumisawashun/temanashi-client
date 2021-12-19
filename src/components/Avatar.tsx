import "./Avatar.scss";
import { FC } from "react";

type Props = {
  src?: string;
};

const Avatar: FC<Props> = ({ src }) => {
  return (
    <div className="avatar">
      <img src={src} alt="user avatar" />
    </div>
  );
};
export default Avatar;
