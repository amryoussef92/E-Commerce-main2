/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/Slider.css";
import mainImg from "./Images/6.png";
import img1 from "./Images/1.jfif";
import img2 from "./Images/2.jfif";
import img3 from "./Images/3.jfif";
import img4 from "./Images/4.jfif";
import img5 from "./Images/5.jfif";
import leftarrow from "./Images/Vector.png";
import rightarrow from "./Images/Vector (1).png";

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

const AmazonSlider = () => {
  const settings = {
    dots: false, // Hide navigation dots
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one large banner at a time
    slidesToScroll: 1,
    arrows: true, // Left & right arrows
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        {[mainImg, img1, img2, img3, img4, img5].map((img, index) => (
          <div key={index}>
            <img
              style={{
                width: "100%",
                height: "597px",
                objectFit: "cover",
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

export default AmazonSlider;
