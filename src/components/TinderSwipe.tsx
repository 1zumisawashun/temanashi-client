import "./TinderSwipe.scss";
import { FC, useState } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const characters = db;
  const [lastDirection, setLastDirection] = useState<string>();

  const swipedRight = () => {
    console.log("you swiped right");
  };
  const swipedLeft = () => {
    console.log("you swiped left");
  };

  // NOTE:directionはup, downなど複数存在する
  const swiped = (direction: string, nameToDelete: string) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    if (direction === "right") {
      swipedRight();
    }
    if (direction === "left") {
      swipedLeft();
    }
    // 最後までスワイプされたら一旦トップページにリダイレクトさせる
    // countメソッドありそう
    if (nameToDelete === "Richard Hendricks") {
      history.push("/");
    }
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="tinder-swipe">
      <h1 className="headline">React Tinder Card</h1>
      <div className="cardContainer">
        {characters.map((character) => (
          <TinderCard
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name)}
            onCardLeftScreen={() => outOfFrame(character.name)}
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
      {lastDirection && (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      )}
    </div>
  );
};

export default TinderSwipe;
