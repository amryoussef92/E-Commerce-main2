import React from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "../Footer/Footer";
import Navbar from "./../Navbar/Navbar";
export default function Layout() {
  return (
    <>
      <Navbar />
      <main role="main" className={`${styles.main}`}>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </>
  );
}
