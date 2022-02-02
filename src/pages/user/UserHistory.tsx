import { FC, useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { productUseCase } from "../../utilities/stripeClient";
import PaymentList from "../../components/DefinitionList/PaymentList";
import Loading from "../../components/Loading";

const UserHistory: FC = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [payments, setPayments] = useState<any[]>([]);
  const { user } = useAuthContext();
  // nullチェック・通常のreturnだとエラーになる
  if (!user) throw new Error("we cant find your account");

  const fetchPayments = async () => {
    try {
      setIsPending(true);
      const results = await productUseCase.fetchPayments(user.uid);
      setPayments(results);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <UserNavbar />
      {isPending && <Loading />}
      <div className="user-container">
        <div className="inner">
          {payments && <PaymentList paymentItems={payments} />}
          {!payments && <div>購入履歴がありません</div>}
        </div>
      </div>
    </>
  );
};
export default UserHistory;
