import React from "react";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import "./Dashboard.css";
import ProjectFilter from "./ProjectFilter";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

type UseCollection = {
  documents: Array<Document>;
  error: String;
};

type TimeStamp = {
  nanoseconds: number;
  seconds: number;
};

type CreatedBy = {
  displayName: String;
  id: String;
  photoURL: String;
};
type Comments = {
  content: String;
  createdAt: TimeStamp;
  displayName: String;
  id: Number;
};

type Document = {
  assignedUsersList: Array<CreatedBy>;
  category: String;
  comments: Array<Comments>;
  createdAt: TimeStamp;
  createdBy: CreatedBy;
  details: String;
  dueDate: TimeStamp;
  id: String;
  name: String;
};

const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const { documents, error }: UseCollection = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState<String>("all");
  console.log(documents);
  const changeFilter = (newFilter: String) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document: Document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignedTome = false;
            document.assignedUsersList.forEach((u: CreatedBy) => {
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
