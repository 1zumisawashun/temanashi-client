import "./TinderSwipe.scss";
import React, { FC, useState, useRef, useMemo } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import { useHistory } from "react-router-dom";
import ThumbUp from "../assets/icon/thumb_up.svg";
import ThumbDown from "../assets/icon/thumb_down.svg";
import Undo from "../assets/icon/undo.svg";
import { ProjectType } from "../types/dashboard";
import ProgressBar from "./ProgressBar";

type Props = {
  db: Array<ProjectType>;
};

const TinderSwipe: FC<Props> = ({ db }) => {
  const history = useHistory();
  const [lastDirection, setLastDirection] = useState<string>();
  const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1);
  const [percent, setPercent] = useState<number>(0);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo<any>(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db.length]
  );

  const progressBarCalclation = (val: number) => {
    console.log(val, "val");
    const result = val + 1;
    const result2 = result / db.length;
    const result3 = 1 - result2;
    setPercent(result3);
    console.log(result3, "========");
  };

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
    progressBarCalclation(val);
    if (currentIndex === 0) {
      console.log("done!");
      //意図的に遅らせないとレンダリングについてこれずに固まる
      // loadingを入れる
      setTimeout(() => {
        history.push("/diagnose/result");
      }, 2000);
    }
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    console.log("swiped");
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };
  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="tinder-swipe">
      <ProgressBar width={400} percent={percent} />
      <div className="cardContainer">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{
                backgroundImage: `url("http://placekitten.com/200/300")`,
              }}
              className="card"
            >
              {/* <div
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className="card"
            > */}
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <button onClick={() => swipe("left")}>
          <img src={ThumbDown} alt="" />
        </button>
        <button onClick={() => goBack()}>
          <img src={Undo} alt="" />
        </button>
        <button onClick={() => swipe("right")}>
          <img src={ThumbUp} alt="" />
        </button>
      </div>
      {lastDirection && (
        <h3 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h3>
      )}
    </div>
  );
};

export default TinderSwipe;
