import { FC, useState, FormEvent } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { CommentToAdd, ProjectType } from "../../types/dashboard";
import FlatButton from "../Button/FlatButton";
import CloseButton from "../Button/CloseButton";

type Props = {
  project: ProjectType;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormModal: FC<Props> = ({ project, setToggleModal }) => {
  const { updateDocument, response } = useFirestore();
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

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
    document.body.style.overflow = "";
  };

  const scrollTop = (): number => {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  };

  const styles = { top: scrollTop() };

  return (
    <>
      <div className="overlay" style={styles}>
        <form className="modal" onSubmit={handleSubmit}>
          <label>
            <span>Add new comment:</span>
            <CloseButton styleName="close-modal" onClick={closeModal} />
            <textarea
              required
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            ></textarea>
          </label>
          <FlatButton content={"Add Comment"} />
        </form>
      </div>
    </>
  );
};

export default FormModal;
