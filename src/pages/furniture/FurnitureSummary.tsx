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
  const [isPending, setIsPending] = useState<boolean>(false);
  const { deleteDocument } = useFirestore();
  const { id }: { id: string } = useParams();
  const { user } = useAuthContext();
  const history = useHistory();
  if (!user) throw new Error("we cant find your account");

  const addCart = async (productId: string) => {
    console.log(productId, "productId");
    if (!productId) return;
    setIsPending(true);
    const getItems = sessionStorage.getItem("productId");
    console.log(getItems, "getItems");
    if (!getItems) {
      const newArray = [productId];
      await sessionStorage.setItem("productId", JSON.stringify(newArray));
    } else {
      const datalist = JSON.parse(getItems);
      const newArray = [productId, ...datalist];
      await sessionStorage.setItem("productId", JSON.stringify(newArray));
    }
    setIsPending(false);
    // history.push("/cart");
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
      {isPending && <Loading />}
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
              {/* <button className="btn" onClick={() => onClickBuy(priceIndex)}>
                購入
              </button> */}
              <button
                className="btn"
                onClick={() => addCart(furniture.product.id)}
              >
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
