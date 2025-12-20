import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
// Import Ethiopia flag from country-flag-icons
import { ET } from "country-flag-icons/react/3x2";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          {/* Make the logo a link to home */}
          <Link to="/" className={styles.logo}>
            eTutor
          </Link>

          <div className={styles.tagline}>
            <ET title="Ethiopia" className="w-6 h-4" />
            <span>best online tutor</span>
          </div>
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
       
        </nav>
      </div>
    </header>
  );
}
