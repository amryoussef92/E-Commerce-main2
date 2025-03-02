import { useNavigate } from "react-router-dom";
import { categoryData } from "../Data";
import "./Category.css";

const Category = () => {
  const navigate = useNavigate();
  return (
    <>
      {categoryData.map((category, index) => (
        <div
          key={index}
          className="slider-overlay category "
          onClick={() => {
            navigate("/allProducts");
          }}
        >
          <h2>{category.title}</h2>
          <div className="slider-items">
            <div className="slider-card">
              {category?.items.map((item, index) => (
                <div key={index} className="slider-box">
                  <img src={item.img} alt={item.name} />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <a href="">{category.LinkText}</a>
          </div>
        </div>
      ))}
      <div></div>
    </>
  );
};

export default Category;
