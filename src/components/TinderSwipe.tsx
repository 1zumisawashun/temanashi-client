import "./TinderSwipe.scss";
import React, { FC, useState, useRef, useMemo } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
// import { useHistory } from "react-router-dom";
import ThumbUp from "../assets/icon/thumb_up.svg";
import ThumbDown from "../assets/icon/thumb_down.svg";
import Undo from "../assets/icon/undo.svg";

const db = [
  {
    name: "Richard Hendricks",
    url: "http://placekitten.com/200/300",
    // url: "../assets/image/richard.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "http://placekitten.com/200/300",
    // url: "../assets/image/erlich.jpg",
  },
  {
    name: "Monica Hall",
    url: "http://placekitten.com/200/300",
    // url: "../assets/image/monica.jpg",
  },
  {
    name: "Jared Dunn",
    url: "http://placekitten.com/200/300",
    // url: "../assets/image/jared.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "http://placekitten.com/200/300",
    // url: "../assets/image/dinesh.jpg",
  },
];

const TinderSwipe: FC = () => {
  // const history = useHistory();
  const [lastDirection, setLastDirection] = useState<string>();
  const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo<any>(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val: any) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  const swipedRight = () => {
    console.log("you swiped right");
  };
  const swipedLeft = () => {
    console.log("you swiped left");
  };

  // set last direction and decrease current index
  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === "right") {
      swipedRight();
    }
    if (direction === "left") {
      swipedLeft();
    }
    // 最後までスワイプされたら一旦トップページにリダイレクトさせる
    // countメソッドありそう
    // if (nameToDelete === "Richard Hendricks") {
    //   history.push("/");
    // }
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
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className="card"
            >
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
