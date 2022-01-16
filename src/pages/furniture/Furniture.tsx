import { useParams } from "react-router-dom";
import FurnitureComments from "./FurnitureComment";
import FurnitureSummary from "./FurnitureSummary";
import { FC, useEffect, useState, useCallback } from "react";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import Loading from "../../components/Loading";

const Project: FC = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [productItem, setProductItem] = useState<ProductItem>();

  const { id }: { id: string } = useParams();

  const fetchProductItem = useCallback(async () => {
    try {
      setIsPending(true);
      const productItem = await productUseCase.fetchProductItem(id);
      setProductItem(productItem);
      console.log(productItem, "productItem");
    } finally {
      setIsPending(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductItem();
  }, [fetchProductItem]);

  if (isPending) {
    return <Loading />;
  }
  if (!productItem) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="project-details">
      <FurnitureSummary furniture={productItem} />
      <FurnitureComments furniture={productItem} />
    </div>
  );
};
export default Project;