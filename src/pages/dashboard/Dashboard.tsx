import { FC, useEffect } from "react";
import ProductFilter from "./ProductFilter";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { productUseCase, ProductItem } from "../../utilities/stripeClient";
import FurnitureList from "../../components/DefinitionList/FurnitureList";
import Loading from "../../components/Loading";

const Dashboard: FC = () => {
  const { user } = useAuthContext();
  const [currentFilter, setCurrentFilter] = useState<String>("all");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const changeFilter = (newFilter: String) => {
    setCurrentFilter(newFilter);
  };

  const fetchProducts = async () => {
    try {
      setIsPending(true);
      const productItems = await productUseCase.fetchAll();
      setProductItems(productItems);
      sessionStorage.setItem("random", `${productItems.length}`);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  const filteredProductItems = productItems
    ? // eslint-disable-next-line
      productItems.filter((productItem: ProductItem) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "development":
          case "salses":
          case "design":
          case "marketing":
            return productItem.product.metadata.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <>
      <h2 className="page-title">Dashboard</h2>
      {isPending && <Loading />}
      {filteredProductItems && (
        <ProductFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {filteredProductItems && (
        <FurnitureList productItems={filteredProductItems} />
      )}
    </>
  );
};

export default Dashboard;
