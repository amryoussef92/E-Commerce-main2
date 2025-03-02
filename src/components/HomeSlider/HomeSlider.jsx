import Categories from "./Categories/Categories";
import "./HomeSlider.css";
import AmazonSlider from "./Slider/Slider";
const HomeSlider = () => {
  return (
    <div className="slider-container">
      <AmazonSlider />
      <Categories />
    </div>
  );
};

export default HomeSlider;
