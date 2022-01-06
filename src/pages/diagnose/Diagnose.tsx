import { FC } from "react";
import TinderSwipe from "../../components/TinderSwipe";
import { useRandomDocument } from "../../hooks/useRandomDocument";
import Loading from "../../components/Loading";

const Diagnose: FC = () => {
  const { documents } = useRandomDocument();

  return (
    <main className="root">
      {documents.length === 0 && <Loading />}
      {documents.length > 0 && <TinderSwipe db={documents} />}
    </main>
  );
};
export default Diagnose;
