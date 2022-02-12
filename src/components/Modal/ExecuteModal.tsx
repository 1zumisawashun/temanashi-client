import { FC } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import FlatButton from "../Button/FlatButton";
import { scrollTop } from "../../utilities/convertValue";

type Props = {
  message: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExecuteModal: FC<Props> = ({ message, onClick, setToggleModal }) => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const closeModal = () => {
    setToggleModal(false);
    document.body.style.overflow = "";
  };

  const styles = { top: scrollTop() };

  return (
    <div className="execute-modal">
      <div className="overlay" style={styles}>
        <div className="wrapper -form">
          <p className="message">{message}</p>
          <div className="buttons">
            <FlatButton
              styleName="-w200 -round -mt50"
              content="はい"
              onClick={onClick}
            />
            <FlatButton
              styleName="-w200 -round -mt50"
              content="いいえ"
              onClick={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecuteModal;
