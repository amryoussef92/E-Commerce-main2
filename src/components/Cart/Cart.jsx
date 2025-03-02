import styles from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  resetStatus,
  updateProductQuantity,
} from "../../Redux/cartSlice";
import { useEffect } from "react";
import { getCart } from "../../Redux/cartSlice";
import Button from "../Button/Button";
import useScreenSize from "../../Hooks/useScreenSize ";
import Loader from "./../Loader/Loader";
import { Helmet } from "react-helmet";
import emptycart from "../../assets/images/emptyCart.avif";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import BtnLoader from "../BtnLoader/BtnLoader";
const Cart = () => {
  const screenSize = useScreenSize();
  const dispatch = useDispatch();
  const { cartItems, status, error, loaderStatus } = useSelector(
    (state) => state.cart
  );
  const numOfCartItems = useSelector((state) => state.cart.numOfCartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  useEffect(() => {
    let timeoutId;

    if (status === "succeeded") {
      toast.success("Product Deleted From Cart", {
        position: "top-right",
      });
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

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="cartPage my-3">
        <div className="container">
          <div className={`${cartItems.length > 0 ? "row" : ""} mt-2`}>
            {cartItems.length > 0 && (
              <div className=" col-sm-3 col-md-12 col-lg-4 order-lg-2">
                <section
                  className={`${styles.cartPage__cartDetails} bg-white p-2`}
                >
                  {screenSize <= 884 && (
                    <p className="fw-bold">
                      Subtotal ({numOfCartItems}): 16,467.00 pounds
                    </p>
                  )}
                  <div className={`${styles.cartPage__cartDetailsBorder}`}>
                    <i
                      aria-hidden={true}
                      className={`fa-solid fa-circle-check text-success`}
                    ></i>{" "}
                    <span className={`text-success`}>
                      Your order qualifies for free shipping.
                    </span>{" "}
                    Select this option when checking out <a href="#">details</a>
                    <p
                      className={`${styles.cartPage__cartDetailsVisabilityLg}`}
                    >
                      Subtotal ({cartItems.length} items):
                      <span className={`fw-bold`}> {totalPrice} pounds</span>
                    </p>
                  </div>
                  <Button
                    className={`${styles.cartPage__cartDetailsButton} rounded-5`}
                    variant="primary"
                  >
                    Checkout
                  </Button>
                </section>
              </div>
            )}
            <div
              className={
                cartItems.length > 0
                  ? " col-sm-9 col-md-12 col-lg-8  order-lg-1"
                  : "w-100 text-center"
              }
            >
              <section className={`${styles.cartPage__cart} bg-white p-4`}>
                {screenSize >= 885 && cartItems.length > 0 && (
                  <h1>shoping Cart</h1>
                )}
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.product.id}>
                      <div className={`${styles.cart__card} py-4`}>
                        <div className={`${styles.cart__container} container`}>
                          <div className="row">
                            <div className="col-5 col-md-3  col-lg-3 d-flex justify-content-between flex-column">
                              <img
                                src={item.product?.imageCover}
                                className="w-100"
                                alt={item.product.title}
                              />
                              {screenSize <= 884 ? (
                                <div
                                  className={`${styles.quantityButton} bg-white`}
                                >
                                  {loaderStatus === "loading" ? (
                                    <BtnLoader />
                                  ) : (
                                    <Button
                                      className={`${styles.cart__btnCount} `}
                                      onClick={() =>
                                        dispatch(
                                          updateProductQuantity({
                                            id: item.product.id,
                                            count: item.count + 1,
                                          })
                                        )
                                      }
                                    >
                                      +
                                    </Button>
                                  )}

                                  {item.count}
                                  {loaderStatus === "loading" ? (
                                    <BtnLoader />
                                  ) : (
                                    <Button
                                      className={styles.cart__btnCount}
                                      onClick={() =>
                                        dispatch(
                                          updateProductQuantity({
                                            id: item.product.id,
                                            count: item.count - 1,
                                          })
                                        )
                                      }
                                    >
                                      {item.quantity <= 0 ? (
                                        <i className="fa-solid fa-trash-can w-50 fs-6"></i>
                                      ) : (
                                        "-"
                                      )}
                                    </Button>
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-7 col-md-6 col-lg-6">
                              <p
                                className={`${styles.cart__description} m-0 fw-bold`}
                              >
                                {item.product.title}
                              </p>
                              {screenSize <= 884 ? (
                                <h5 className={`${styles.cart__price}`}>
                                  {item.price * item.count}.00 pound
                                </h5>
                              ) : (
                                ""
                              )}
                              <p
                                className={`${
                                  item.product.quantity > 0
                                    ? "text-success"
                                    : "text-danger"
                                } fs-6 m-0`}
                              >
                                {item.product.quantity > 0
                                  ? "available"
                                  : "unAvailable"}
                              </p>
                              <p className="fs-6 m-0">
                                Eligible for free shipping
                              </p>
                              {screenSize >= 885 ? (
                                <div className={`${styles.quantityButton}`}>
                                  {loaderStatus === "loading" ? (
                                    <BtnLoader />
                                  ) : (
                                    <Button
                                      className={`${styles.cart__btnCount} `}
                                      onClick={() =>
                                        dispatch(
                                          updateProductQuantity({
                                            id: item.product.id,
                                            count: item.count + 1,
                                          })
                                        )
                                      }
                                    >
                                      +
                                    </Button>
                                  )}
                                  {item.count}
                                  {loaderStatus === "loading" ? (
                                    <BtnLoader />
                                  ) : (
                                    <Button
                                      className={styles.cart__btnCount}
                                      onClick={() =>
                                        dispatch(
                                          updateProductQuantity({
                                            id: item.product.id,
                                            count: item.count - 1,
                                          })
                                        )
                                      }
                                    >
                                      {item.quantity <= 0 ? (
                                        <i className="fa-solid fa-trash-can w-50 fs-6"></i>
                                      ) : (
                                        "-"
                                      )}
                                    </Button>
                                  )}
                                </div>
                              ) : (
                                ""
                              )}
                              <a
                                className={`${styles.cart__linkes} mx-2  bg-white`}
                                href="#"
                                onClick={() =>
                                  dispatch(removeFromCart(item.product.id))
                                }
                              >
                                Delete
                              </a>
                              |
                              <a
                                className={`${styles.cart__linkes} mx-2 bg-white`}
                                href="#"
                              >
                                share
                              </a>
                            </div>
                            {screenSize >= 885 && (
                              <div
                                className={`${styles.cardPrice} col-md-3 col-lg-3`}
                              >
                                <h5>{item.price * item.count}.00 pound</h5>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyCart}>
                    <img src={emptycart} alt="empty cart image" />
                    <h1>
                      <Link to="/allProducts">Shop Now</Link>
                    </h1>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
