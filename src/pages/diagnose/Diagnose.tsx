import { FC } from "react";
import "./Diagnose.scss";
import TinderSwipe from "../../components/TinderSwipe";
import ProgressBar from "../../components/ProgressBar";
import { useRandomDocument } from "../../hooks/useRandomDocument";

const Diagnose: FC = () => {
  const { documents } = useRandomDocument();

  return (
    <main className="root">
      <ProgressBar width={400} percent={0.5} />
      {/* <TinderSwipe puppyData={puppyData} fetchPuppyData={refetch} /> */}
      <TinderSwipe db={documents} />
    </main>
  );
};
export default Diagnose;
