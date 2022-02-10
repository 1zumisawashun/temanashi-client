import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useHistory } from "react-router-dom";
import { FC, FormEvent, useState } from "react";
import LikeButton from "../../components/Button/LikeButton";
import PreviewModal from "../../components/Modal/PreviewModal";
import { ProductItem } from "../../utilities/stripeClient";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { taxIncludedPrice } from "../../utilities/convertValue";
import { useCookies } from "react-cookie";

type Props = {
  furniture: ProductItem;
};

const ProjectSummary: FC<Props> = ({ furniture }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(["productId"]);

  const { deleteDocument } = useFirestore();
  const { id }: { id: string } = useParams();
  const { user } = useAuthContext();
  const history = useHistory();
  if (!user) throw new Error("we cant find your account");

  const addCart = async (productId: string) => {
    if (!productId) return;
    setIsPending(true);
    try {
      if (!cookies.productId) {
        const newArray = [productId];
        setCookie("productId", newArray, { path: "/" });
      } else {
        const newArray = [productId, ...cookies.productId];
        setCookie("productId", newArray);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsPending(false);
      history.push(`/users/${user.uid}/cart`);
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
    <>
      {isPending && <Loading />}
      <div className="project-summary-container">
        <div className="thumbnail">
          {furniture.product.images.length > 0 ? (
            <img src={furniture.product.images[0]} alt="" onClick={openModal} />
          ) : (
            <img src="https://placehold.jp/200x160.png" alt="" />
          )}
          {toggleModal && (
            <PreviewModal
              src={"https://placehold.jp/330x200.png"}
              setToggleModal={setToggleModal}
            />
          )}
        </div>

        <h2 className="title">{furniture.product.name}</h2>
        {Object.keys(furniture.prices).map((priceIndex) => (
          <div key={priceIndex} className="content">
            <div className="price">
              {taxIncludedPrice(furniture.prices[priceIndex].unit_amount)}
            </div>
            <p className="details">{furniture.product.description}</p>
            <div className="btnarea">
              <button className="btn" onClick={handleClick}>
                削除
              </button>
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
    </>
  );
};
export default ProjectSummary;
