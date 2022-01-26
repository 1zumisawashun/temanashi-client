import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";
import { FC, FormEvent, useState } from "react";
import LikeButton from "../../components/Button/LikeButton";
import PreviewModal from "../../components/Modal/PreviewModal";
import { ProductItem, productUseCase } from "../../utilities/stripeClient";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { taxIncludedPrice } from "../../utilities/convertValue";

type Props = {
  furniture: ProductItem;
};

const ProjectSummary: FC<Props> = ({ furniture }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [isPendingBuy, setIsPendingBuy] = useState<boolean>(false);
  const { deleteDocument } = useFirestore();
  const { id }: { id: string } = useParams();
  const { user } = useAuthContext();
  const history = useHistory();
  if (!user) throw new Error("we cant find your account");

  const onClickBuy = async (priceId: string) => {
    try {
      setIsPendingBuy(true);
      const uid = user.uid;
      if (!uid) return;
      const url = window.location.origin;
      const urls = {
        seccess_url: `${url}/complete`,
        cancel_url: `${url}/error`,
      };
      await productUseCase.buy(uid, priceId, urls);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${!!error.message ? error.message : error}`);
      }
    } finally {
      console.log("success");
      setIsPendingBuy(false);
    }
  };

  const handleClick = (e: FormEvent) => {
    if (furniture.product) deleteDocument<ProductItem>("products", id);
    history.push("/");
  };

  const openModal = () => {
    setToggleModal(true);
    document.body.style.overflow = "hidden";
  };
  // オプショナルチェーンを付けないとバグる。早期リターンを付与する
  return (
    <div className="project-summary-container">
      {isPendingBuy && <Loading />}
      <div className="project-summary">
        <div className="image-box">
          <img
            src={furniture.product.images[0]}
            alt=""
            className="image"
            onClick={openModal}
          />
          {toggleModal && (
            <PreviewModal
              src={"https://placehold.jp/330x200.png"}
              setToggleModal={setToggleModal}
            />
          )}
        </div>

        <h2 className="page-title">{furniture.product.name}</h2>
        {/* <p className="due-date">
          {project.dueDate?.toDate().toDateString()}
        </p> */}
        {Object.keys(furniture.prices).map((priceIndex) => (
          <div key={priceIndex}>
            <div className="price">
              {taxIncludedPrice(furniture.prices[priceIndex].unit_amount)}
            </div>
            <p className="details">{furniture.product.description}</p>
            <div className="btnarea">
              <button className="btn" onClick={() => onClickBuy(priceIndex)}>
                購入
              </button>
              <LikeButton furniture={furniture} />
            </div>
          </div>
        ))}
      </div>
      {/* {user.uid === project.createdBy?.id && ( */}
      <button className="btn" onClick={handleClick}>
        Delete Here...
      </button>
    </div>
  );
};
export default ProjectSummary;
