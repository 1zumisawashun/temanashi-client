import { FC } from "react";
import { Link } from "react-router-dom";

const error: FC = () => {
  return (
    <>
      <div className="error-container">
        <div className="error-block">
          <div className="main">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <h1>404</h1>
            <p>
              It looks like you're lost... <br /> That's a trouble?
            </p>
            <Link to="/" className="goback-button">
              Go back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default error;
