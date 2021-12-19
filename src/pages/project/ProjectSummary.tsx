import Avatar from "../../components/Avatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";
import { ProjectType } from "../../types/dashboard";
import { FC,FormEvent } from "react";

type Props = {
  project: ProjectType;
};

const ProjectSummary: FC<Props> = ({ project }) => {
  const { deleteDocument } = useFirestore();
  const { user } = useAuthContext();
  const history = useHistory();
  const handleClick = (e: FormEvent) => {
    deleteDocument<ProjectType>("projects", project.id);
    history.push("/");
  };
  // オプショナルチェーンを付けないとバグる。早期リターンを付与する
  return (
    <div className="project-summary-container">
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy?.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate?.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList?.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy?.id && (
        <button className="btn" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
};
export default ProjectSummary;
