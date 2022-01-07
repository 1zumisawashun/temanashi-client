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
    document.body.style.overflow = "";
  };

  const scrollTop = (): number => {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  };

  const styles = { top: scrollTop() };

  //FIXME:スライダーを入れる・拡大機能を入れる
  return (
    <>
      <div className="overlay" style={styles}>
        <div className="modal">
          <CloseButton onClick={closeModal} />
          <img src={src} alt="" />
        </div>
      </div>
    </>
  );
};

export default PreviewModal;
