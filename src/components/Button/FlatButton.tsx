import { FC } from "react";
type Props = {
  content: string;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const FlatButton: FC<Props> = ({ content, isDisabled, onClick }: Props) => {
  return (
    <button className="btn -mt10" onClick={onClick} disabled={isDisabled}>
      {content}
    </button>
  );
};
export default FlatButton;
