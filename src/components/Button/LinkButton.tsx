import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  path: string;
  content: string;
};

const LinkButton: FC<Props> = ({ path, content }: Props) => {
  return <Link to={`${path}`}>{content}</Link>;
};
export default LinkButton;
