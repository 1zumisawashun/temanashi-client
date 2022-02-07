import Temple from "../assets/icon/icon_temple.svg";
import { FC, useState } from "react";
import HamburgerMenu from "../components/HambergerMenu";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={!isOpen ? "navbar" : "navbar -active"}>
      <ul className="wrapper">
        {!isOpen && (
          <li className="logo">
            <img src={Temple} alt="" />
            <span>Temanashi</span>
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
