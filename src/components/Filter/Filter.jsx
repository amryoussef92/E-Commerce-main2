import React, { useEffect, useState } from "react";
import styles from "./Filter.module.css";
import { IoMdStar } from "react-icons/io";

export default function Filter({ selections }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  useEffect(() => {
    if (selectedBrand || selectedPrice) {
      selections({ brand: selectedBrand, price: selectedPrice });
    }
  }, [selectedBrand, selectedPrice]);
  return (
    <div className={styles.filter}>
      <div className="form-check">
        <p
          style={{
            fontWeight: " 600",
            fontSize: "14.23px",
            lineHeight: "17.22px",
            letterSpacing: "0%",
          }}
        >
          Delivery Day
        </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadio"
            id="flexRadio"
          />
          <label
            className="form-check-label"
            htmlFor="flexRadio"
            style={{
              fontWeight: " 400",
              fontSize: " 12.45px",
              lineHeight: "15.06px",
              letterSpacing: "0%",
            }}
          >
            Get It in 2 Days
          </label>
        </div>
      </div>
      <div className="form-check">
        <p
          style={{
            fontWeight: " 600",
            fontSize: "14.23px",
            lineHeight: "17.22px",
            letterSpacing: "0%",
          }}
        >
          Customer Reviews
        </p>

        <div className={styles.starsDiv}>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;

            return (
              <label className={styles.border_style} key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className={styles.border_style}
                />
                <IoMdStar
                  key={i}
                  className={styles.star}
                  size={20}
                  color={
                    ratingValue <= (hover || rating)
                      ? " rgba(255, 204, 0, 1)"
                      : "rgb(245, 225, 146)"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
          <label className={styles.ratingLabel}>& up</label>
        </div>
      </div>
      <div className="form-check">
        <p
          style={{
            fontWeight: " 700",
            fontSize: "14.23px",
            lineHeight: "17.22px",
            letterSpacing: "0%",
          }}
        >
          Brands
        </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="Samsung"
            onChange={handleBrandChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Samsung
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            value="LG"
            onChange={handleBrandChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            LG
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault3"
            value="Haier"
            onChange={handleBrandChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault3">
            Haier
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault4"
            value="Daikin"
            onChange={handleBrandChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault4">
            Daikin
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault5"
            value="Godrej"
            onChange={handleBrandChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault5">
            Godrej
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault6"
            value="IFB"
            onChange={handleBrandChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault6">
            IFB
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault7"
            value="Panasonic"
            onChange={handleBrandChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault7">
            Panasonic
          </label>
        </div>
      </div>
      <div className="form-check">
        <p
          style={{
            fontWeight: " 700",
            fontSize: "14.23px",
            lineHeight: "17.22px",
            letterSpacing: "0%",
          }}
        >
          Price
        </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioPrice"
            id="flexRadioPrice1"
            value="All"
            onChange={handlePriceChange}
          />
          <label className="form-check-label" htmlFor="flexRadioPrice1">
            All
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioPrice"
            id="flexRadioPrice2"
            value="5900 - 10000"
            onChange={handlePriceChange}
          />
          <label className="form-check-label" htmlFor="flexRadioPrice2">
            ₹5900 to ₹10,000
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioPrice"
            id="flexRadioPrice3"
            value="10000 - 20000"
            onChange={handlePriceChange}
          />
          <label className="form-check-label" htmlFor="flexRadioPrice3">
            ₹10,000 to ₹20,000
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioPrice"
            id="flexRadioPrice4"
            value="20000 - 30000"
            onChange={handlePriceChange}
          />
          <label className="form-check-label" htmlFor="flexRadioPrice4">
            ₹20,000 to ₹30,000
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioPrice"
            id="flexRadioPrice5"
            value="30000 - 45000"
            onChange={handlePriceChange}
          />
          <label className="form-check-label" htmlFor="flexRadioPrice5">
            ₹30,000 to ₹45,000
          </label>
        </div>
      </div>
    </div>
  );
}
