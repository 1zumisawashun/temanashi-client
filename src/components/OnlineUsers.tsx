import "./OnlineUsers.css";
import { useCollection } from "../hooks/useCollection";
import Avatar from "../components/Avatar";
import { CreatedUser } from "../types/dashboard";
import { FC } from "react";

const OnlineUsers: FC = () => {
  const { error, documents } = useCollection("users");
  console.log(documents);
  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user: CreatedUser) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
};
export default OnlineUsers;
