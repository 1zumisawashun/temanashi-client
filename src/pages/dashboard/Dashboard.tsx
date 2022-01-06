import { FC } from "react";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { ProjectType, User } from "../../types/dashboard";

const Dashboard: FC = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection<ProjectType>("projects");
  const [currentFilter, setCurrentFilter] = useState<String>("all");
  const changeFilter = (newFilter: String) => {
    setCurrentFilter(newFilter);
  };

  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  const projects = documents
    ? documents.filter((document: ProjectType) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignedTome = false;
            document.assignedUsersList.forEach((u: User) => {
              if (user.uid === u.id) {
                assignedTome = true;
              }
            });
            return assignedTome;
          case "development":
          case "salses":
          case "design":
          case "marketing":
            console.log(document.category, currentFilter);
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </>
  );
};

export default Dashboard;
