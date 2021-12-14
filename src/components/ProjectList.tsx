import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import "./ProjectList.css";
import { FC } from "react";
import { Project } from "../types/dashboard";

type Props = {
  projects: Array<Project>;
};

const ProjectList: FC<Props> = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project: Project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
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
