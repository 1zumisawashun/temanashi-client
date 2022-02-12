import { FC, useState, FormEvent } from "react";
import { firebase, timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { CommentToAdd } from "../../@types/dashboard";
import FlatButton from "../Button/FlatButton";
import CloseButton from "../Button/CloseButton";
import { ProductItem } from "../../utilities/stripeClient";
import { scrollTop } from "../../utilities/convertValue";

type Props = {
  referense: firebase.firestore.CollectionReference<CommentToAdd>;
  item: ProductItem;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormModal: FC<Props> = ({ referense, item, setToggleModal }) => {
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
      id: Math.random(), // FIXME:被る可能性があるのでuuidに変更する
    };

    try {
      referense.add(commentToAdd);
      item.comments = [...item.comments, commentToAdd];
      setNewComment("");
    } catch (error) {
      if (error instanceof Error) {
        setNewComment("");
      }
    } finally {
      closeModal();
    }
  };

  const closeModal = () => {
    setToggleModal(false);
    document.body.style.overflow = "";
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
