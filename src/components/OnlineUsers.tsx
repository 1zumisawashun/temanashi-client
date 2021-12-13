import "./OnlineUsers.css";
import { useCollection } from "../hooks/useCollection";
import Avatar from "../components/Avatar";
import { CreatedBy } from "../types/dashboard";

const OnlineUsers: React.FC = () => {
  const { error, documents } = useCollection("users");
  console.log(documents);
  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user: CreatedBy) => (
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
