import React, { useState } from "react";
import logo from "../../assets/images/amazon-black.png";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";

export default function Login() {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        dispatch(login(data.token));
        console.log("Login successful:", data);
        navigate("/home");
      } catch (error) {
        formik.setErrors({
          email: error.response?.data?.message || "Something went wrong",
        });
      }
    },
  });

  function validateEmail() {
    if (!formik.errors.email) {
      setIsEmailValid(true);
    }
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="logo_container text-center">
            <img src={logo} alt="Amazon logo" className="w-25" />
          </div>
          <div className="border w-50 w-md-40 w-lg-25 shadow-sm mx-auto border-1 rounded-3 my-3 p-5 ">
            <h1>Sign in</h1>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium">
                Email
              </label>
              <input
                type="email"
                className="form-control w-100"
                id="email"
                {...formik.getFieldProps("email")}
                autoComplete="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </div>

            {!isEmailValid && (
              <div className="d-grid gap-2 mb-4">
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={validateEmail}
                >
                  Continue
                </button>
              </div>
            )}
            {isEmailValid && (
              <>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...formik.getFieldProps("password")}
                    autoComplete="password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="d-grid gap-2 mb-4">
                  <button className="btn btn-warning" type="submit">
                    Sign in
                  </button>
                </div>
              </>
            )}

            <p>
              By continuing, you agree to Amazon's{" "}
              <a href="" className="text-decoration-underline">
                Conditions of use
              </a>{" "}
              and{" "}
              <a href="#" className="text-decoration-underline">
                Privacy notice
              </a>
            </p>
            <i className="fa-solid fa-caret-right fa-lg mx-2 text-black-50"></i>
            <a href="" className="text-decoration-none">
              Need help?
            </a>
            <hr className="my-5" />
            <h2>Buying for work?</h2>
            <a href="" className="text-decoration-none">
              Shop on Amazon business
            </a>
          </div>
        </div>
      </form>

      <hr className={styles.hr} />
      <div className="container d-flex flex-column justify-content-center align-items-center gap-3 my-4">
        <div className="top d-flex justify-content-center gap-5">
          <a href="" className="text-decoration-none">
            Conditions of Use
          </a>
          <a href="" className="text-decoration-none">
            Privacy Notice
          </a>
          <a href="" className="text-decoration-none">
            Help
          </a>
        </div>
        <div className="bottom">
          <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </>
  );
}
