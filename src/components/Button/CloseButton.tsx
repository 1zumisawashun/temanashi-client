import { FC } from "react";
type Props = {
  styleName: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CloseButton: FC<Props> = ({ styleName, onClick }: Props) => {
  return (
    <button className={styleName} onClick={onClick}>
      &times;
    </button>
  );
};
export default CloseButton;
