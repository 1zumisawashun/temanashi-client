import "./PreviewModal.scss";
import { FC } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import CloseButton from "../Button/CloseButton";

type Props = {
  src: string;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreviewModal: FC<Props> = ({ src, setToggleModal }) => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const closeModal = () => {
    setToggleModal(false);
  };

  //FIXME:スライダーを入れる・拡大機能を入れる
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <CloseButton onClick={closeModal} />
        <img src={src} alt="" />
      </div>
    </>
  );
};

export default PreviewModal;
