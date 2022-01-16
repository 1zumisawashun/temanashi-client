import { FC, useState } from "react";
import Avatar from "../../components/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Comment, ProjectType, CommentToAdd } from "../../types/dashboard";
import FormModal from "../../components/Modal/FormModal";
import FlatButton from "../../components/Button/FlatButton";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import { useParams } from "react-router-dom";
import { useSubCollection } from "../../hooks/useSubCollection";
import { convertedPath } from "../../utilities/convertValue";
import { ProductDoc } from "../../types/stripe";

type Props = {
  furniture: ProductItem;
};

const ProjectComments: FC<Props> = ({ furniture }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const { id }: { id: string } = useParams();

  const { referense } = useSubCollection<any, any>(
    convertedPath(`/products/${id}/comments`)
  );

  const openModal = () => {
    setToggleModal(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <div className="project-comments">
        <h4>Project Comments</h4>
        <ul className="comment-list">
          {furniture.comments?.length > 0 &&
            furniture.comments?.map((comment: Comment) => (
              <li key={comment.id}>
                <div className="comment-auther">
                  <Avatar src={comment.photoURL} />
                  <p>{comment.displayName}</p>
                </div>
                <div className="comment-date">
                  <p>
                    {formatDistanceToNow(comment.createdAt?.toDate(), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
              </li>
            ))}
        </ul>
        <FlatButton content={"comment"} onClick={openModal} />
        {toggleModal && referense && (
          <FormModal
            referense={referense}
            item={furniture}
            setToggleModal={setToggleModal}
          />
        )}
      </div>
    </>
  );
};

export default ProjectComments;
