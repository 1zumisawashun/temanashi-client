import "./Avatar.css";
import React from "react";

type Props = {
  src?: string;
};

const Avatar: React.FC<Props> = ({ src }) => {
  return (
    <div className="avatar">
      <img src={src} alt="user avatar" />
    </div>
  );
};
export default Avatar;
