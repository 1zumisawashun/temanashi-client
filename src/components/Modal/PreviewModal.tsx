import { FC } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import CloseButton from "../Button/CloseButton";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { scrollTop } from "../../utilities/convertValue";

type Props = {
  src: Array<string>;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PreviewModal: FC<Props> = ({ src, setToggleModal }) => {
  const { user } = useAuthContext();
  if (!user) throw new Error("we cant find your account");

  const closeModal = () => {
    setToggleModal(false);
    document.body.style.overflow = "";
  };

  const styles = { top: scrollTop() };

  //FIXME:スライダーを入れる・拡大機能を入れる
  return (
    <>
      <div className="overlay" style={styles}>
        <div className="modal">
          <CloseButton styleName="close-modal" onClick={closeModal} />
          <Carousel>
            {src.map((item) => (
              <div>
                <img src={item} alt="" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default PreviewModal;
