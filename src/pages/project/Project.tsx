import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import ProjectSummary from "./ProjectSummary";
// import "./Project.scss";
import ProjectComments from "./ProjectComments";
import { ProjectType } from "../../types/dashboard";
import { FC } from "react";

const Project: FC = () => {
  const { id }: { id: string } = useParams();
  const { error, document } = useDocument<ProjectType>("projects", id);
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
};
export default Project;
