import React, { useEffect } from "react";
import styles from "./Wishlist.module.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  deleteWishlist,
  addToWishlist,
} from "../../Redux/wishlistSlice";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const dispatch = useDispatch();

  // Access Redux state
  const {
    wishListNumber,
    status: wishlistStatus,
    error: wishlistError,
  } = useSelector((state) => state.wishlist);

  const wishlistDetails = useSelector(
    (state) => state.wishlist.wishlistDetails || []
  );

  const isLoading = wishlistStatus === "loading";

  // Fetch wishlist details on component mount
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  // Add product to wishlist
  const handleAddToWishlist = async (id) => {
    try {
      const resultAction = await dispatch(addToWishlist(id));
      if (addToWishlist.fulfilled.match(resultAction)) {
        toast.success("Product Added To Wishlist");
      } else {
        toast.error("Something went wrong, please try again");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Something went wrong, please try again");
    }
  };

  // Delete item from wishlist
  const handleDeleteFromWishlist = async (id) => {
    try {
      const resultAction = await dispatch(deleteWishlist(id));
      if (deleteWishlist.fulfilled.match(resultAction)) {
        toast.success("Product Deleted From Wishlist");
        dispatch(getWishlist()); // Refresh the wishlist after deletion
      } else {
        toast.error("Something went wrong, please try again");
      }
    } catch (error) {
      console.error("Error deleting from wishlist:", error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <>
    <Helmet>
      <title>Wishlist</title>
    </Helmet>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
         wait
        </div>
      ) : wishlistDetails.length > 0 ? (
        <div className={`${styles.wishlistContainer} container`}>
          <h2 className={styles.heading}>My Wishlist</h2>
          <div className="row">
            {wishlistDetails.map((el) => (
              <div key={el._id} className="col-md-4 my-1">
                <div className={styles.card}>
                  <img
                    src={el.imageCover}
                    alt={el.title || "No Title"}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardBody}>
                    <h5 className={styles.cardTitle}>
                      {el.title
                        ? el.title.split(" ").slice(0, 3).join(" ")
                        : "No Title"}
                    </h5>
                    <p className={styles.cardBrand}>
                      {el.brand?.name || "N/A"}
                    </p>
                    <p className={styles.cardCategory}>
                      {el.category?.name || "N/A"}
                    </p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardPrice}>
                        ${el.price || "0.00"}
                      </span>
                      <span className={styles.cardRating}>
                        ⭐ {el.ratingsAverage || "0"} (
                        {el.ratingsQuantity || "0"} reviews)
                      </span>
                    </div>
                    <div className={styles.cardButtons}>
                      <button
                        onClick={() => handleAddToWishlist(el.id)}
                        className={styles.addToCartButton}
                      >
                        <i className="fas fa-cart-plus"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteFromWishlist(el.id)}
                        className={styles.removeButton}
                      >
                        {isLoading ? (
                         'wait'
                        ) : (
                          <i className="fas fa-trash"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-muted vh-100  d-flex justify-content-center align-items-center fs-5 fw-bolder">
          Your Wishlist is Empty.
        </p>
      )}
    </>
  );
}