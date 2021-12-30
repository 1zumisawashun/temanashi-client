import { FC } from "react";
type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CloseButton: FC<Props> = ({ onClick }: Props) => {
  return (
    <button className="close-modal" onClick={onClick}>
      &times;
    </button>
  );
};
export default CloseButton;
