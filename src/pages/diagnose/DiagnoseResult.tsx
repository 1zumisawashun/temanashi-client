import { FC } from "react";
import "./DiagnoseResult.scss";
import { Link } from "react-router-dom";
import { db, recommendation, Furniture } from "../../utilities/dammyData";

const DiagnoseResult: FC = () => {
  return (
    <>
      <div className="recommendation">
        <div className="image-box">
          <img src={recommendation.imageUrl} alt="" className="image" />
        </div>
        <div className="content-box">
          <h1>シンプル風</h1>
          <p>{recommendation.details}</p>
          <div className="color">
            <p className="item">ベースカラー：{recommendation.baseColor}</p>
            <p className="item">サブカラー：{recommendation.subColor}</p>
          </div>
          <div className="price">
            <p className="item">この組み合わせで〇〇円</p>
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
              <p>{furniture.price}</p>
              <div className="assigned-to">
                <ul>
                  <li>{furniture.width}</li>
                  <li>{furniture.depth}</li>
                  <li>{furniture.height}</li>
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
