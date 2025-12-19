import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>eTutor</div>
          <div className={styles.tagline}>Professional Tutoring Service</div>
        </div>

        {/* Hamburger for mobile */}
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <div className={`${styles.bar} ${isOpen ? styles.bar1 : ""}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.bar2 : ""}`}></div>
          <div className={`${styles.bar} ${isOpen ? styles.bar3 : ""}`}></div>
        </div>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/lecturers">Lecturers</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
