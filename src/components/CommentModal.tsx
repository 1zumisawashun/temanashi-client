import "./CommentModal.scss";
import { FC, useState, FormEvent } from "react";
import { timestamp } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { CommentToAdd, ProjectType } from "../types/dashboard";

type Props = {
  project: ProjectType;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentModal: FC<Props> = ({ project, setToggleModal }) => {
  const { updateDocument, response } = useFirestore();
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const commentToAdd: CommentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
      // FIXME:被る可能性があるのでuuidに変更する
    };
    await updateDocument<ProjectType>("projects", project.id, {
      // スプレッド構文を使ってcommentArrayに追加で上書きする
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
    closeModal();
  };

  const closeModal = () => {
    setToggleModal(false);
  };

  return (
    <>
      <div className="overlay"></div>
      <form className="modal" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <button className="close-modal" onClick={closeModal}>
            &times;
          </button>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </>
  );
};

export default CommentModal;
