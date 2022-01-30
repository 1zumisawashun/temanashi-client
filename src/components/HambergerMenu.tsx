import { FC } from "react";
import Hamburger from "hamburger-react";
import Temple from "../assets/icon/temple.svg";
import FlatButton from "./Button/FlatButton";
import { useAuthContext } from "../hooks/useAuthContext";
import { useHistory } from "react-router-dom";

type Prop = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerMenu: FC<Prop> = ({ state, setState }) => {
  const history = useHistory();
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const closeHamburger = (path: string) => {
    setState(!state);
    history.push(path);
  };

  return (
    <>
      <ul className="responsive-header">
        {!state && (
          <li className="logo">
            <img src={Temple} alt="" />
            <span>Temanashi</span>
          </li>
        )}
        {state && (
          <>
            <ul className="menu">
              <li className="hamburger-link">
                <FlatButton
                  content="dashboard"
                  onClick={() => closeHamburger("/")}
                />
              </li>
              <li className="hamburger-link">
                <FlatButton
                  content="New Furniture"
                  onClick={() => closeHamburger("/create/furniture")}
                />
              </li>
              <li className="hamburger-link">
                <FlatButton
                  content="Diagnose"
                  onClick={() => closeHamburger("/diagnose")}
                />
              </li>
              <li className="hamburger-link">
                <FlatButton
                  content="Shopping Cart"
                  onClick={() => closeHamburger(`/users/${user.uid}/cart`)}
                />
              </li>
            </ul>
          </>
        )}
        <li className="hamburger-box">
          <Hamburger toggled={state} toggle={setState} />
        </li>
      </ul>
    </>
  );
};

export default HamburgerMenu;
