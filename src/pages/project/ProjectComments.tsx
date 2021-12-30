import { FC, useState } from "react";
import Avatar from "../../components/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Comment, ProjectType } from "../../types/dashboard";
import CommentModal from "../../components/Modal/FormModal";
import FlatButton from "../../components/Button/FlatButton";

type Props = {
  project: ProjectType;
};

const ProjectComments: FC<Props> = ({ project }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const changeModal = () => {
    setToggleModal(true);
  };

  return (
    <>
      <div className="project-comments">
        <h4>Project Comments</h4>
        <ul>
          {project.comments?.length > 0 &&
            project.comments?.map((comment: Comment) => (
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
        <FlatButton content={"comment"} onClick={changeModal} />
        {toggleModal && (
          <CommentModal project={project} setToggleModal={setToggleModal} />
        )}
      </div>
    </>
  );
};

export default ProjectComments;
