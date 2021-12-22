import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useAuthContext } from "../hooks/useAuthContext";

import "./Sidebar.scss";
import DashboardIcon from "../assets/icon/dashboard_icon.svg";
import AddIcon from "../assets/icon/add_icon.svg";
import FeedbackIcon from "../assets/icon/feedback_icon.svg";
import { FC } from "react";

const Sidebar: FC = () => {
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>hey {user.displayName}</p>
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
                <span>Diagnose here...</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
