/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Styles/BestSellerSlider.css";
import "./Styles/Responsive.css";
import mainImg from "./Images/image 128.png";
import img1 from "./Images/image 129.png";
import img2 from "./Images/image 130.png";
import img3 from "./Images/image 131.png";
import img4 from "./Images/image 132.png";
import img5 from "./Images/image 133.png";
import img6 from "./Images/image 134.png";
import img7 from "./Images/image 135.png";
import img8 from "./Images/image 136.png";
import img9 from "./Images/image 137.png";
import img10 from "./Images/image 138.png";
import img11 from "./Images/image 139.png";
import img12 from "./Images/image 140.png";
import rightarrow from "./Images/Vector.png";
import leftarrow from "./Images/Vector (1).png";

// Custom prev Arrow
const PrevArrow = ({ onClick }) => {
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <img src={leftarrow} alt="leftarrow" />
    </div>
  );
};

// Custom Next Arrow
const NextArrow = ({ onClick }) => {
  return (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <img src={rightarrow} alt="rightarrow" />
    </div>
  );
};
const BestSellerSlider = () => {
  const settings = {
    dots: false, // Hide navigation dots
    infinite: true,
    speed: 500,
    slidesToShow: 8, // Show eight category at a time
    slidesToScroll: 1,
    arrows: true, // Left & right arrows
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="bestSeller">
      <h2>Best Sellers in Clothing & Accessories</h2>
      <Slider {...settings}>
        {[
          mainImg,
          img1,
          img2,
          img3,
          img4,
          img5,
          img6,
          img7,
          img8,
          img9,
          img10,
          img11,
          img12,
        ].map((img, index) => (
          <div key={index}>
            <img
              style={{
                width: "100%",
                height: "225px",
                objectFit: "cover",
                gap: "10px",
              }}
              src={img}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BestSellerSlider;
