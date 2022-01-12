import { FC } from "react";
type Props = {
  content: string;
  styleName?: string;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const FlatButton: FC<Props> = ({
  styleName,
  content,
  isDisabled,
  onClick,
}: Props) => {
  return (
    <button
      className={styleName + ` btn -mt10`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {content}
    </button>
  );
};
export default FlatButton;
