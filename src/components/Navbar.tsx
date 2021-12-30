import "./Navbar.scss";
import Temple from "../assets/icon/temple.svg";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { FC, FormEvent } from "react";
import FlatButton from "./Button/FlatButton";
import LinkButton from "./Button/LinkButton";

const Navbar: FC = () => {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="" />
          <span>Temanashi</span>
        </li>
        {!user && (
          <>
            <li>
              <LinkButton path={"/login"} content={"Login"} />
            </li>
            <li>
              <LinkButton path={"/signup"} content={"Signup"} />
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending && (
              <FlatButton content={"Logout"} onClick={handleSubmit} />
            )}
            {isPending && (
              <FlatButton content={"Logging out..."} isDisabled={true} />
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
