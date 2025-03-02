import React, { useState } from "react";
import styles from "./Navbar.module.css";
import amazon_logo from "../../assets/images/amazon.png";
import vector from "../../assets/images/Vector.png";
import arrow from "../../assets/images/arrow.png";
import searchIcon from "../../assets/images/search.png";
import india from "../../assets/images/india.png";
import whiteArrow from "../../assets/images/whiteArrow.png";
import cart from "../../assets/images/cart.png";
import menu from "../../assets/images/menu.png";
import { Link } from "react-router-dom";

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 3;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isBodyDark, setIsBodyDark] = useState(false);
  const handleClick = () => {
    setIsVisible(!isVisible);
    setIsBodyDark(!isBodyDark);
  };
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.NavbarBelt}>
          <div className={styles.NavbarBelt__leftNavBelt}>
            <Link to="/home">
              {" "}
              <img
                className={styles.amazonlogo_navbar}
                src={amazon_logo}
                alt="amazonLogo"
              />
            </Link>
            <div className={styles.navbarBelt_location_toggle}>
              <div className={styles.navbarBelt_location}>
                <div className={styles.navbarBelt_locationImg}>
                  <img src={vector} alt="amazonLogo" />
                </div>
                <div className={styles.navbarBelt_locationPlace}>
                  <div className={styles.navbarBelt_locationTop}>
                    Delivering to Surat 394210
                  </div>
                  <div className={styles.navbarBelt_locationBottom}>
                    Update location
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.NavbarBelt__navbarBeltSearchBox}>
            <div className={styles.navbarBeltSearchDiv}>
              <div className={styles.navbarBeltSearchBoxAll}>
                <div className={styles.navbarBeltSearchBoxAllText}>All</div>
                <img src={arrow} alt="arrow" />
              </div>
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                className={styles.navbarInput}
                placeholder="Search Amazon.in"
              />
              <div
                className={styles.searchIconNavbarBelt}
                onClick={handleSearch}
              >
                <img src={searchIcon} alt="searchIcon" />
              </div>
            </div>
          </div>
          <div className={styles.NavbarBelt__rightNavBelt}>
            <div className={styles.flages}>
              <img src={india} alt="flag" />

              <div className={styles.flagCode}>
                <label className={styles.flagCode_text}>EN</label>
                <img
                  src={whiteArrow}
                  alt="arrow"
                  style={{ marginTop: "1", marginLeft: "-0.4" }}
                  className={styles.flaghidden}
                />
              </div>
              <div className={styles.flagesHiddenDiv}>
                <div className="d-flex w-50 justify-content-center">
                  <input
                    type="radio"
                    id="checkbox1"
                    className="circle w-25"
                    name="lang"
                  />
                  <label htmlFor="checkbox1"> العربية - AR</label>
                </div>
                <div className="d-flex w-50 justify-content-center">
                  <input
                    type="radio"
                    id="checkbox2"
                    className="circle w-25"
                    name="lang"
                  />
                  <label htmlFor="checkbox1"> English - EN</label>
                </div>

                <a href="/#">Learn More</a>
                <p className="w-75">You are shopping on Amazon.eg</p>
                <a href="/#">Change country/region</a>
              </div>
            </div>
            <div className={styles.signInNavbar_toggle}>
              <div className={styles.signInNavbar}>
                <div className={styles.TopsignInNavbar}>Hello, sign in</div>
                <div className={styles.BottomSignInNavbar}>
                  Account &Lists
                  <img
                    src={whiteArrow}
                    alt="arrow"
                    style={{ marginLeft: "7px" }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.ReturnsAndOrders_toggle}>
              <div className={styles.ReturnsAndOrders}>
                Returns{" "}
                <label className={styles.ReturnsAndOrders_bold}>
                  & Orders{" "}
                </label>
              </div>
            </div>
            <Link className={styles.Navbar_cartDiv} to={"cart"}>
              <img src={cart} alt="cart" style={{ marginTop: "-20px" }} />
              <span className={styles.Navbar_cartDiv_label}>Cart</span>
            </Link>
          </div>
        </div>
        <div className={styles.navbarBanner}>
          <div className={styles.navbarBannerOptions} onClick={handleClick}>
            <img
              src={menu}
              alt="menuIcon"
              style={{ marginBottom: "5px", marginRight: "5px" }}
            />
            All
          </div>

          <div
            className={styles.scrollable_list}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            onMouseDownCapture={preventDefault}
          >
            <div className={styles.list_item}>Amazon mini TV</div>
            <div className={styles.list_item}>Sell</div>
            <div className={styles.list_item}>Best Sellers</div>
            <div className={styles.list_item}>Today’s Deals</div>
            <div className={styles.list_item}>Mobiles</div>
            <div className={styles.list_item}>Customer Service</div>
            <div className={styles.list_item_hover}>
              <pre
                className={styles.list_item}
                style={{ fontSize: "17px", fontWeight: "800" }}
              >
                Prime{" "}
                <img
                  src={whiteArrow}
                  alt="arrow"
                  style={{ marginRight: "3px" }}
                />
              </pre>

              <div className={styles.primHidden}>
                <p>
                  Enjoy FREE delivery on millions of items, exclusive shopping,
                  and entertainment benefits when you join Prime
                </p>
              </div>
            </div>
            <div className={styles.list_item}>Electronics</div>
            <div className={styles.list_item}>Fashion</div>
            <div className={styles.list_item}>New Releases</div>
            <div className={styles.list_item}>Home & Kitchen</div>
            <div className={styles.list_item}>Amazon Pay</div>
          </div>
        </div>
        <div>
          {isVisible && (
            <div className={styles.fixedRightSideDiv}>
              <div className={styles.fixedRightSideDiv_bigTitle}>
                <p>Hello, Sign In</p>
                <span onClick={handleClick}>X </span>
              </div>
              <div className={styles.hiddenList}>
                <div style={{ borderBottom: "1px solid", margin: "10px" }}>
                  <h5>trending</h5>
                  <p>Best Seelers</p>
                  <p>New Releases</p>
                </div>
                <div style={{ borderBottom: "1px solid", margin: "10px" }}>
                  <h5>Programs & Features</h5>
                  <p>Amazon Outlet</p>
                  <p>Sell on Amazon</p>
                  <p>Subscribe & Save</p>
                </div>
              </div>
              <div className={styles.navbarBelt_location}>
                <div className={styles.navbarBelt_locationImg}>
                  <img src={vector} alt="amazonLogo" />
                </div>
                <div className={styles.navbarBelt_locationPlace}>
                  <div className={styles.navbarBelt_locationTop}>
                    Delivering to Surat 394210
                  </div>
                  <div className={styles.navbarBelt_locationBottom}>
                    Update location
                  </div>
                </div>
              </div>
              <div className={styles.flages}>
                <img src={india} alt="flag" />

                <div className={styles.flagCode}>
                  <label className={styles.flagCode_text}>EN</label>
                  <img
                    src={whiteArrow}
                    alt="arrow"
                    style={{ marginTop: "1", marginLeft: "-0.4" }}
                  />
                </div>
              </div>
              <div className={styles.signInNavbar}>
                <div className={styles.TopsignInNavbar}>Hello, sign in</div>
                <div className={styles.BottomSignInNavbar}>
                  Account &Lists
                  <img
                    src={whiteArrow}
                    alt="arrow"
                    style={{ marginLeft: "7px" }}
                  />
                </div>
              </div>
              <div className={styles.ReturnsAndOrders}>
                Returns{" "}
                <label className={styles.ReturnsAndOrders_bold}>
                  & Orders{" "}
                </label>
              </div>
              <div
                className={styles.Navbar_cartDiv}
                style={{ display: "block" }}
              >
                <img src={cart} alt="cart" style={{ marginTop: "-20px" }} />
                <span className={styles.Navbar_cartDiv_label}>Cart</span>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
