import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { FC } from "react";
import { ProjectType } from "../../types/dashboard";

type Props = {
  projects: Array<ProjectType>;
};

const ProjectList: FC<Props> = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project: ProjectType) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <div className="image-box">
            <img
              src="https://placehold.jp/330x200.png"
              alt=""
              className="image"
            />
          </div>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default ProjectList;
