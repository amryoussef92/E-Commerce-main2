/* eslint-disable react/prop-types */
import React from "react";
import styles from "./CardFour.module.css";
import imageOne from "../../assets/images/item1.jpg";

export default function CardFour({
  items,
  className,
  subTitle,
  show = false,
  seeMoreLink = "#",
}) {
  return (
    <section className={`${styles.gridContainer} ${className} bg-white p-3`}>
      <h5 className="fw-bold">{subTitle}</h5>
      <div className="row row-cols-2">
        {items.map((item) => (
          <>
            <div className="col" key={item._id}>
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-75 bg-black"
                title={item.title}
              />
              {show ? (
                <p className={styles.item__title}>
                  {item.title.split(" ").slice(0, 2).join(" ")}
                </p>
              ) : (
                ""
              )}
            </div>
          </>
        ))}
      </div>{" "}
      <a href={seeMoreLink} className="text-success fs-6">
        see more
      </a>
    </section>
  );
}
