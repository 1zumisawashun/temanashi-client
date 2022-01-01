import { FC } from "react";
import "./Diagnose.scss";
import TinderSwipe from "../../components/TinderSwipe";
import { useRandomDocument } from "../../hooks/useRandomDocument";

const Diagnose: FC = () => {
  const { documents } = useRandomDocument();

  return (
    <main className="root">
      {documents.length > 0 && <TinderSwipe db={documents} />}
    </main>
  );
};
export default Diagnose;
