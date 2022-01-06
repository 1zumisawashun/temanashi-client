import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuthContext } from "../hooks/useAuthContext";
import DashboardIcon from "../assets/icon/dashboard_icon.svg";
import AddIcon from "../assets/icon/add_icon.svg";
import FeedbackIcon from "../assets/icon/feedback_icon.svg";
import CartIcon from "../assets/icon/shopping_cart.svg";
import { FC } from "react";

const Sidebar: FC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <NavLink exact to={`/users/${user.uid}/favorite`}>
            {/* nullチェック */}
            {user.photoURL && <Avatar src={user.photoURL} />}
            <p>hey {user.displayName}</p>
          </NavLink>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/diagnose">
                <img src={FeedbackIcon} alt="add project icon" />
                <span>Diagnose</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={`/users/${user.uid}/cart`}>
                <img src={CartIcon} alt="add project icon" />
                <span>Shopping Cart</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
