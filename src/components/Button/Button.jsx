import React from "react";
import styles from "./Button.module.css";

const Button = ({
  onClick,
  children,
  variant = "default",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
