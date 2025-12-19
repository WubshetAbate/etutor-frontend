import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import heroImage from "../../public/images/EtutorBanner.png"

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to eTutor</h1>
      <p className={styles.description}>
        Your trusted platform for personalized tutoring. Connect with
        experienced, licensed lecturers and achieve your academic goals.
      </p>
      <Link to="/register" className={styles.button}>
        Get Started
      </Link>
      <img
        src="../../public/images/EtutorBanner.png"
        alt="hero"
        className={styles.heroImage}
      />
    </div>
  );
}
