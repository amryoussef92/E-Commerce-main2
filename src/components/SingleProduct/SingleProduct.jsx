import React, { useState, useEffect } from "react";
import styles from "./SingleProduct.module.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Loader/Loader";
import useFetch from "../../Hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, resetStatus } from "../../Redux/cartSlice.js";
import Button from "../Button/Button.jsx";
import Review from "./../Review/Review";
import ReviewSummary from "./../ReviewSummary/ReviewSummary";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const { data } = useFetch(
    "get",
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  const { status } = useSelector((state) => state.cart);
  useEffect(() => {
    let timeoutId;

    if (status === "succeeded") {
      toast.success("Product Added To Cart", {
        position: "top-right",
      });

      timeoutId = setTimeout(() => {
        dispatch(resetStatus());
      }, 2000);
    } else if (status === "failed") {
      toast.error("Something went wrong please try again");
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [status, dispatch]);

  useEffect(() => {
    if (data) {
      setProduct(data.data);
      setSelectedImage(data.data.imageCover);
    }
  }, [data]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= i) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className={styles.container__rating__star}
          />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarHalfAlt}
            className={styles.container__rating__star}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarEmpty}
            className={styles.container__rating__star}
          />
        );
      }
    }
    return stars;
  };

  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      {product && (
        <div className={`${styles.container} ${styles.product}`}>
          {product?.images && product?.images.length > 0 && (
            <div className={styles.gallery}>
              {product.images.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`${product.title} subimage ${index}`}
                  className={styles.gallery__thumbnail}
                  onClick={() => setSelectedImage(imgUrl)}
                />
              ))}
            </div>
          )}

          <div className={styles.container__image}>
            <img
              src={selectedImage}
              alt={product.title}
              className={styles.container__image__img}
            />
          </div>

          <div className={styles.container__description}>
            <p className={styles.container__brand}>
              Brand: {product.brand.name}
            </p>
            <h2 className={styles.container__title || <Loader />}>
              {product.title}
            </h2>
            <div className={styles.container__rating}>
              <span className={styles.stars}>
                {product.ratingsAverage} {renderStars(product.ratingsAverage)}
              </span>
              <span className={styles.count}>
                {product.ratingsQuantity} ratings
              </span>
              <a href="#" className={styles.searchLink}>
                Search this page
              </a>
            </div>
            <hr />

            <p className={styles.container__price}>
              <sup>SAR</sup>
              {product.price}
            </p>
            <p>All price include VAT.</p>
            <p>
              <span style={{ fontWeight: "200" }}>sign in to redeem.</span>
              <span style={{ background: "#71ED58" }}> Extra 20% </span>off with
              meem credit cards.
            </p>
            <p>Enter code MEEM20 at checkout. Discount by Amazon.</p>
            <img
              src="https://i.ibb.co/R4tp3zMj/Frame-497.png"
              alt="Frame-497"
              border="0"
            />
            <hr />

            <div className={styles.container__description__text}>
              <span>About this item</span>
              <ul className={styles.descriptionList}>
                {product.description.split("\n").map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.container__summary}>
            <h2 className={styles.container__price}>
              <sup>SAR</sup>
              {product.price}
            </h2>
            <p>
              SAR 96 delivery <strong>6-9 october</strong>
            </p>
            <a href="#">delivery to riyadh - Update location</a>
            <p className={styles.delivery}>Usually ships within 4 to 5 days</p>
            <select name="quantity" id="quantity" className="quantity">
              <option value="1">Quantity:1</option>
              <option value="2">Quantity:2</option>
              <option value="3">Quantity:3</option>
              <option value="4">Quantity:4</option>
              <option value="5">Quantity:5</option>
            </select>{" "}
            <br />
            <Button
              className={`fw-bold ${styles.summary__add}`}
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </Button>
            <Button className={`fw-bold ${styles.summary__buy}`}>
              Buy Now
            </Button>
            <p className="summary__seller-info">
              Ships from <strong className={styles.seller}>Monatik LLC</strong>{" "}
              <br />
              Sold by <strong className={styles.seller}>
                Monatik LLC
              </strong>{" "}
              <br />
              Payment{" "}
              <a className={styles.seller} href="#secure-transaction">
                Secure transaction
              </a>
            </p>
            <Button className={styles.addtolist}>Add to List</Button>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4 my-2">
            <ReviewSummary />
          </div>
          <div className="col-12 col-lg-8">
            <Review />
          </div>
        </div>
      </div>
    </>
  );
}
