import React, { useEffect, useState, FormEvent } from "react";
import "./Create.css";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { CreatedUser } from "../../types/dashboard";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

type Option = {
  value: string;
  label: string;
};

const Create: React.FC = () => {
  const history = useHistory();
  const { addDocument, response } = useFirestore("projects");
  // convert [{...},{...}] and add props "value","label" to use Select component
  const { documents } = useCollection("users");
  const [users, setUsers] = useState<Array<Option>>([]);
  const { user } = useAuthContext();

  // FIXME: any型を潰す
  const [name, setName] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [dueDate, setDueDate] = useState<any>("");
  const [category, setCategory] = useState<Option | null>(null);
  const [assignedUsers, setAssignedUser] = useState<Array<CreatedUser>>([]);
  const [formError, setFromError] = useState<string | null>(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user: any) => {
        return {
          value: user,
          label: user.displayName,
        };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFromError(null);
    if (!category) {
      setFromError("Please select aa project category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFromError("Please assign the project to at least 1 user");
    }

    const createdBy: CreatedUser = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
      online: false,
    };

    const assignedUsersList = assignedUsers.map((u: any) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
        online: false,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
  };
  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option: any) => setAssignedUser(option)}
            options={users}
            isMulti
          />
        </label>
        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
