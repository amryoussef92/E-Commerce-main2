import { useEffect, useMemo, useState } from "react";
import styles from "./AllProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, deleteWishlist } from "../../Redux/wishlistSlice.js";
import { addToCart, resetStatus } from "../../Redux/cartSlice.js";
import Filter from "../Filter/Filter.jsx";
import { useQuery } from "@tanstack/react-query";
import Button from "../Button/Button.jsx";
import Loader from "./../Loader/Loader";
import { Helmet } from "react-helmet";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState({});
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.cart);

useEffect(() => {
  let timeoutId;

  if (status === "succeeded") {
    toast.success("Product Added To Cart");

    timeoutId = setTimeout(() => {
      dispatch(resetStatus()); 
    }, 2000);
  } else if (status === "failed") {
    toast.error("Something went wrong please try again");
  }

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
}, [status, dispatch]);


  const handleAddToCart = (product, event) => {
    event.preventDefault();
    dispatch(addToCart(product));
  };
  function fetchData() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["featureProducts"],
    queryFn: fetchData,
  });

  useEffect(() => {
    if (data) {
      setProducts(data.data.data);
      setAllProducts(data.data.data);
    }
  }, [data]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoriteProducts")
    );
    if (storedFavorites) {
      setFavoriteProducts(storedFavorites);
    }
  }, []);
  const handleSearch = (query) => {
    const filteredProducts = allProducts.filter((product) => {
      return (
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    });
    setProducts(filteredProducts);
  };

  const handleFilter = (obj) => {
    const filteredProducts = allProducts.filter(
      (product) =>
        product.brand.name.toLowerCase().includes(obj.brand.toLowerCase()) ||
        (product.price >= obj.price.split("-")[0] &&
          product.price <= obj.price.split("-")[1])
    );
    setProducts(filteredProducts);
  };

  const toggleFavorite = async (id) => {
    setFavoriteProducts((prevFavorites) => {
      const isCurrentlyFavorite = prevFavorites[id];
      const updatedFavorites = {
        ...prevFavorites,
        [id]: !isCurrentlyFavorite,
      };

      // Dispatch Redux actions based on favorite status
      if (!isCurrentlyFavorite) {
        dispatch(addToWishlist(id))
          .unwrap()
          .then(() => {
            toast.success("Product Added To Wishlist");
          })
          .catch(() => {
            toast.error("Something went wrong, please try again");
          });
      } else {
        dispatch(deleteWishlist(id))
          .unwrap()
          .then(() => {
            toast.success("Product Deleted From Wishlist");
          })
          .catch(() => {
            toast.error("Something went wrong, please try again");
          });
      }

      // Update local storage
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(updatedFavorites)
      );
      return updatedFavorites;
    });
  };
  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * 1000).toFixed();
  }, []);
  const randomPercentage = useMemo(() => {
    return Math.floor(Math.random() * 100).toFixed();
  }, []);
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error fetching data. Please try again later.</div>;
  }
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <section className={`${styles.allProducts}  `}>
        <div className="container  ">
          <div className="row">
            <div className="col-5 col-md-2">
              {" "}
              <Filter selections={handleFilter} />
            </div>
            <div className="col-7 col-md-10">
              <div className="row row-cols-1 row-cols-sm-3 row-cols-md-4 g-2">
                {products.map((product) => (
                  <div className="col" key={product.id}>
                    <div className={styles.products}>
                      <div style={{ position: "relative" }}>
                        <img
                          src={product.imageCover}
                          className="w-100"
                          alt={product.title}
                        />
                        <div className={styles.layer}>
                          <button
                            className={`${styles.favoriteButton} ${
                              favoriteProducts[product.id] ? "favorite" : ""
                            }`}
                            onClick={() => toggleFavorite(product.id)}
                          >
                            <i
                              style={
                                favoriteProducts[product.id]
                                  ? { color: "red" }
                                  : { color: "white" }
                              }
                              className="fa-solid fa-heart fs-5"
                            ></i>
                          </button>
                          <Link to={"/product/" + product.id}>
                            <i className="fa-regular fa-eye fs-5 text-white"></i>
                          </Link>
                        </div>
                      </div>
                      <h3 className="h6" title={product.title}>
                        {product.title.split(" ").slice(0, 2).join(" ") + "..."}
                      </h3>
                      <p className={`${styles.rating}`}>
                        <i className={`fa fa-star text-warning`}></i>
                        <i className={`fa fa-star text-warning`}></i>
                        <i className={`fa fa-star text-warning`}></i>
                        <i className={`fa fa-star text-warning`}></i>
                        <i className=" fa-regular fa-star text-warning"></i>{" "}
                        <span className={`${styles.ratingNumbers}`}>
                          {product.ratingsAverage}
                        </span>
                      </p>
                      <p className={`${styles.grayColor}`}>
                        {randomNumber}+ bought in past month
                      </p>
                      <p className={`${styles.grayColor} my-0`}>
                        <span className="text-black fs-3">
                          ₹{product.price}{" "}
                        </span>
                        ({randomPercentage}% off)
                      </p>
                      <p className={`${styles.grayColor} fs-6`}>
                        save extra with no cost
                      </p>
                      <p>
                        free delivery by{" "}
                        <span className="fw-bold text-black">
                          sat, 14 sep, 7:00am -9:00pm
                        </span>
                      </p>
                      <Button
                        className={`${styles.cartBtn}`}
                        onClick={(event) => handleAddToCart(product, event)}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
