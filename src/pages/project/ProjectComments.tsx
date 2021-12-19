import { useState, FormEvent } from "react";
import Avatar from "../../components/Avatar";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Comment, CommentToAdd, ProjectType } from "../../types/dashboard";

type Props = {
  project: ProjectType;
};

const ProjectComments: React.FC<Props> = ({ project }) => {
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
    console.log(commentToAdd);
    await updateDocument<ProjectType>("projects", project.id, {
      // スプレッド構文を使ってcommentArrayに追加で上書きする
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };
  return (
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
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
};

export default ProjectComments;
