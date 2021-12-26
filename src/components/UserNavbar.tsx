import "./UserNavbar";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const UserNavbar: FC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");
  return (
    <main>
      <nav className="tab-link">
        <NavLink to={`/users/${user.uid}/favorite`}>favorite</NavLink>
        <NavLink to={`/users/${user.uid}/history`}>history</NavLink>
        <NavLink to={`/users/${user.uid}/account`}>account</NavLink>
        <hr />
      </nav>
    </main>
  );
};
export default UserNavbar;
