import React from "react";
import styles from "./BtnLoader.module.css";
import { RotatingLines } from "react-loader-spinner";
export default function BtnLoader() {
  return (
    <RotatingLines
      visible={true}
      height="96"
      width="15"
      color="grey"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
