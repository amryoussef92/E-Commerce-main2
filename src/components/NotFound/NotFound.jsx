import React from "react";
import styles from "./NotFound.module.css";
import image from "../../assets/images/404.jpg";
import { Helmet } from "react-helmet";
export default function NotFound() {
  return (
    <>
    <Helmet>
    <title>Not Found 404</title>
  </Helmet>
    <div className={`d-flex justify-content-center`}>
      <img src={image} alt="404 image" className="w-50" />
    </div>
    </>
  );
}
