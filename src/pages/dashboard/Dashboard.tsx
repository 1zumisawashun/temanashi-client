import { FC, useEffect } from "react";
import ProjectFilter from "./ProjectFilter";
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
      console.log(productItems, "productItem");
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
    ? productItems.filter((productItem: ProductItem) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            break;
          // let assignedTome = false;
          // document.assignedUsersList.forEach((u: User) => {
          //   if (user.uid === u.id) {
          //     assignedTome = true;
          //   }
          // });
          // return assignedTome;
          case "development":
          case "salses":
          case "design":
          case "marketing":
            return productItem.product.category === currentFilter;
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
        <ProjectFilter
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
