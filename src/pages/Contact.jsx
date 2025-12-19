import React from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.subtitle}>
        Get in touch with eTutor for any questions or inquiries
      </p>

      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <div className={styles.icon}>📞</div>
          <div className={styles.details}>
            <h3 className={styles.label}>Phone</h3>
            <a href="tel:+251706655338" className={styles.link}>
              +251706655338
            </a>
          </div>
        </div>

        <div className={styles.contactItem}>
          <div className={styles.icon}>✉️</div>
          <div className={styles.details}>
            <h3 className={styles.label}>Email</h3>
            <a href="mailto:etutor3558@gmail.com" className={styles.link}>
              etutor3558@gmail.com
            </a>
          </div>
        </div>

        <div className={styles.contactItem}>
          <div className={styles.icon}>📍</div>
          <div className={styles.details}>
            <h3 className={styles.label}>Location</h3>
            <p className={styles.text}>Ethiopia, Addis Ababa</p>
          </div>
        </div>
      </div>
    </div>
  );
}


