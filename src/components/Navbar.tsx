import Temple from "../assets/icon/temple.svg";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { FC, FormEvent, useState } from "react";
import FlatButton from "./Button/FlatButton";
import LinkButton from "./Button/LinkButton";
import { useHistory } from "react-router-dom";
import HamburgerMenu from "../components/HambergerMenu";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  const history = useHistory();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    logout();
    history.push("/login");
  };

  return (
    <div className="navbar">
      <ul className="wrapper">
        {!isOpen && (
          <li className="logo">
            <img src={Temple} alt="" />
            <span>Temanashi</span>
          </li>
        )}
        {!user && (
          <>
            <li>
              <LinkButton path="/login" content="Login" />
            </li>
            <li>
              <LinkButton path="/signup" content="Signup" />
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending && (
              <FlatButton content="Logout" onClick={handleSubmit} />
            )}
            {isPending && (
              <FlatButton content="Logging out..." isDisabled={true} />
            )}
          </li>
        )}
      </ul>
      <div className="responsive-wrapper">
        <HamburgerMenu state={isOpen} setState={setIsOpen} />
        </div>
    </div>
  );
};

export default Navbar;
