import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const tabList: Array<string> = ["favorite", "history", "account"];

const UserNavbar: FC = () => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");
  const [currentTab, setCurrentTab] = useState<number>(0);

  const changeTab = (index: number) => {
    const newIdx = index;
    setCurrentTab(newIdx);
  };

  return (
    <ul className="user-tab-bar">
      {tabList.map((tab, index) => (
        <NavLink
          to={`/users/${user.uid}/${tab}`}
          key={tab}
          onClick={() => changeTab(index + 1)}
          className={currentTab === index + 1 ? "active" : ""}
        >
          {tab}
        </NavLink>
      ))}
    </ul>
  );
};
export default UserNavbar;
