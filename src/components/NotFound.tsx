import { FC } from "react";
import NotFoundIcon from "../assets/icon/icon_not_found.svg";

const NotFound: FC = () => {
  return (
    <div className="not-found-container">
      <img src={NotFoundIcon} alt="" />
      <p className="message">Not Found...</p>
    </div>
  );
};
export default NotFound;
