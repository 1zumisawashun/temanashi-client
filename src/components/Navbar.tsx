import { Link } from "react-router-dom";
import "./Navbar.scss";
import Temple from "../assets/temple.svg";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { FC, FormEvent } from "react";

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
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending && (
              <button className="btn" onClick={handleSubmit}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="btn" disabled>
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
