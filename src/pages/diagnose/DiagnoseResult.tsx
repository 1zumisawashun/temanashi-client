import { FC } from "react";
import { Link } from "react-router-dom";
import { db, recommendation } from "../../utilities/dammyData";
import { taxIncludedPrice } from "../../utilities/convertValue";
import Loading from "../../components/Loading";

const DiagnoseResult: FC = () => {
  return (
    <>
      {db.length === 0 && recommendation && <Loading />}
      <div className="diagnose-result">
        <div className="thumbnail">
          <img src={recommendation.imageUrl} alt="" />
        </div>
        <div className="content">
          <h1>シンプル風</h1>
          <p className="text">{recommendation.details}</p>
          <div className="colors">
            <div className="item">
              <p className="text">ベースカラー：{recommendation.baseColor}</p>
              <span className="cercle -white"></span>
            </div>
            <div className="item">
              <p className="text">サブカラー：{recommendation.subColor}</p>
              <span className="cercle -grey"></span>
            </div>
          </div>
          <div className="price">
            <p className="item">
              この組み合わせで
              <span className="total">{taxIncludedPrice(1200000)}円</span>
            </p>
          </div>
        </div>
      </div>
      <div className="product-list">
        {db.map((furniture) => (
          <Link to="/diagnose" key={furniture.name}>
            <div className="image-box">
              <img src={furniture.imageUrl} alt="" />
            </div>
            <div className="content-box">
              <h4>{furniture.name}</h4>
              {furniture.price && <p>{taxIncludedPrice(furniture.price)}</p>}
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
