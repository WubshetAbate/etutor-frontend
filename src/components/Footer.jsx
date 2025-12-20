import React from "react";
import styles from "./Footer.module.css";
import {
  FaTiktok,
  FaYoutube,
  FaTelegramPlane,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Contact Info with Icons */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Contact Us</h3>
          <p>
            <FaEnvelope className={styles.icon} />{" "}
            <a href="mailto:etutor3558@gmail.com">etutor3558@gmail.com</a>
          </p>
          <p>
            <FaPhone className={styles.icon} />{" "}
            <a href="tel:+251706655338">+251 706 655 338</a>
          </p>
          <p>
            <FaMapMarkerAlt className={styles.icon} /> Addis Ababa, Ethiopia
          </p>
        </div>

        {/* Social Media */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Follow Us</h3>
          <div className={styles.social}>
            <a
              href="https://www.tiktok.com/@etutor3558?_r=1&_t=ZM-92O4ep0zwyG"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok size={30} />
            </a>
            <a
              href="https://www.youtube.com/@eTutor-u9x"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={30} />
            </a>
            <a
              href="https://t.me/etutor3558"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane size={30} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.copy}>
        © {new Date().getFullYear()} eTutor — All Rights Reserved.
      </div>
    </footer>
  );
}
