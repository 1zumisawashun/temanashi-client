import { FC } from "react";
import { Link } from "react-router-dom";
import { db, recommendation } from "../../utilities/dammyData";
import { Furniture } from "../../types/dashboard";
import { taxIncludedPrice } from "../../utilities/convertValue";
import furnitureImage from "../../assets/image/furniture_1.jpg";

const DiagnoseResult: FC = () => {
  return (
    <>
      <div className="recommendation">
        <div className="image-box">
          <img src={furnitureImage} alt="" />
        </div>
        <div className="content-box">
          <h1>シンプル風</h1>
          <p className="text">{recommendation.details}</p>
          <div className="color">
            <div className="item">
              <p className="text">ベースカラー：{recommendation.baseColor}</p>
              <span className="cercle -white"></span>
            </div>
            <p className="item">
              <p className="text">サブカラー：{recommendation.subColor}</p>
              <span className="cercle -grey"></span>
            </p>
          </div>
          <div className="price">
            <p className="item">
              この組み合わせで
              <span className="total">{taxIncludedPrice(1200000)}円</span>
            </p>
          </div>
        </div>
      </div>
      <div className="diagnose-result-list">
        {db.length === 0 && <p>No furnitures yet!</p>}
        {db.map((furniture: Furniture) => (
          <Link to="/diagnose" key={furniture.name}>
            <div className="image-box">
              <img src={furniture.imageUrl} alt="" className="image" />
            </div>
            <div className="content-box">
              <h4>{furniture.name}</h4>
              <p>{taxIncludedPrice(furniture.price)}</p>
              <div className="assigned-to">
                <ul>
                  <li>幅{furniture.width}cm</li>
                  <li>深さ{furniture.depth}cm</li>
                  <li>高さ{furniture.height}cm</li>
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
export default DiagnoseResult;
