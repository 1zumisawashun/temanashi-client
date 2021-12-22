import { FC } from "react";
import "./Diagnose.scss";
// import { WelcomeScreen } from './WelcomeScreen'
import TinderSwipe from "../../components/TinderSwipe";

const Diagnose: FC = () => {
  // const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  // const { data, refetch } = useQuery(FETCH_ALL_PUPPIES);
  // firebaseで代替する

  // const puppyData =
  //   data &&
  //   [...data.queryPuppy].sort((puppyA, puppyB) =>
  //     puppyA.name > puppyB.name ? -1 : 1
  //   );

  return (
    <main className="root">
      {/* <TinderSwipe puppyData={puppyData} fetchPuppyData={refetch} /> */}
      <TinderSwipe />
    </main>
  );
};
export default Diagnose;
