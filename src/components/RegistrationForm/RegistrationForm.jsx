import styles from "./RegistrationForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10,15}$/, "Invalid phone number")
    .required("Mobile number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Re-enter password is required"),
});

export default function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          rePassword: data.rePassword,
        }
      );
      setLoading(false);
      setMessage(response.data.message);
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
    <Helmet>
    <title>Sign up</title>
  </Helmet>
    <div className={styles.pageContainer}>
      {/* Amazon Logo at the Top */}
      <div className={styles.logoContainer}>
        <img
          src="https://i.ibb.co/kg1G3MLT/Group-1.png"
          alt="Amazon Logo"
          className={styles.logo}
        />
      </div>

      <div className={styles.container}>
        <h2>Create Account</h2>
        {message && <p className={styles.message}>{message}</p>}
        <form onSubmit={handleSubmit(onsubmit)}>
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
          <p className={styles.error}>{errors.name?.message}</p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            autoComplete="email"
          />
          <p className={styles.error}>{errors.email?.message}</p>
          <label htmlFor="phone">Mobile Number</label>
          <input
            id="phone"
            type="text"
            placeholder="Enter your mobile number"
            {...register("phone")}
          />
          <p className={styles.error}>{errors.phone?.message}</p>

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            autoComplete="new-password"
          />
          <p className={styles.error}>{errors.password?.message}</p>

          <label htmlFor="repassword">Re-enter Password</label>
          <input
            id="repassword"
            type="password"
            placeholder="Re-enter your password"
            {...register("rePassword")}
            autoComplete="off"
          />
          <p className={styles.error}>{errors.repassword?.message}</p>

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <hr className={styles.separator} />
        {/*Buying for work section  */}
        <div className={styles.businessSection}>
          <p className={styles.businessText}>Buying from work?</p>

          <Link to="/business-signup" className={styles.link}>
            Create a free business account
          </Link>
        </div>
        <hr className={styles.separator} />

        {/* Already have an account section */}
        <p className={styles.signInText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>
        </p>
        <p className={styles.termsText}>
          By creating an account or logging in, you agree to Amazon &apos;s{" "}
          <Link to="/terms" className={styles.link}>
            Condition of Use
          </Link>
          and{" "}
          <Link to="/privacy" className={styles.link}>
            Privacy Notice
          </Link>
        </p>
      </div>

      <div className={styles.footer}>
        <Link to="/terms">Conditions of Use</Link>
        <Link to="/privacy">Privacy Notice</Link>
        <Link to="/help">Help</Link>
        <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
    </>
  );
}
