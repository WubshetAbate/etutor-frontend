import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const [video1Src, setVideo1Src] = useState(
    "https://www.youtube.com/embed/2_yFJRe5MzY?si=2BTgjYv8H94GJcYz"
  );

  const getHoverSrc = (src) => `${src}&autoplay=1&mute=1`;

  // FAQ data
  const faqs = [
    {
      question: "How much does registration cost?",
      answer:
        "Our registration is very affordable. Prices vary by subject and grade, but we ensure it is cheaper than other tutoring services.",
    },
    {
      question: "Which subjects do you cover?",
      answer:
        "We cover all subjects from Grade 1 to Grade 12, including Math, Physics, Chemistry, Biology, English, and more.",
    },
    {
      question: "Can I choose my preferred lecturer?",
      answer:
        "Yes! Our platform allows you to select experienced and licensed lecturers according to your preferences and availability.",
    },
    {
      question: "How do the online classes work?",
      answer:
        "Classes are conducted via our platform’s interactive video sessions. You can ask questions, submit homework, and get real-time feedback.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to eTutor</h1>
      <h2 className={styles.subtitle}>የጎበዝ ተማሪዎች ምርጫ</h2>

      <p className={styles.description}>
        Ethiopia’s best online tutoring platform. We cover all subjects from
        Grade 1 to Grade 12, connecting students with our experienced lecturers.
        Register now and learn with us to upgrade your academic knowledge at an
        affordable fee.
      </p>

      <p className={styles.description}>
        የኢትዮጵያ ምርጥ የኦንላይን ላይ ትምህርት። ከ1ኛ እስከ 12ኛ ክፍል ድረስ ሁሉንም የትምህርት አይነቶች
        እናስተምራለን። ይመዝገቡና በተመጣጣኝ ዋጋ ዕውቀትዎን ያሻሽሉ። ወላጆች ልጆቻችሁን በዘመናዊ መንገድ ያስተምሩ።
        <br />
        ለመመዝገብ ⬇️⬇️
      </p>

      <Link to="/register" className={styles.button}>
        Join Now <br />
        አሁኑኑ ይቀላቀሉ
      </Link>

      <img
        src="/images/EtutorBanner.png"
        alt="hero"
        className={styles.heroImage}
        loading="lazy"
      />

      {/* Video Section */}
      <div className={styles.videoSection}>
        {/* First video */}
        <div
          className={styles.videoWrapper}
          onMouseEnter={() =>
            setVideo1Src(
              getHoverSrc(
                "https://www.youtube.com/embed/2_yFJRe5MzY?si=2BTgjYv8H94GJcYz"
              )
            )
          }
          onMouseLeave={() =>
            setVideo1Src(
              "https://www.youtube.com/embed/2_yFJRe5MzY?si=2BTgjYv8H94GJcYz"
            )
          }
        >
          <div className={styles.videoTitle}></div>
          <iframe
            src={video1Src}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Second video */}
        <div className={styles.videoWrapper}>
          <div className={styles.videoTitle}>Biology Lecture</div>
          <div className={styles.playOverlay}>▶</div>
          <video
            src="/videos/biologyLecture.mp4"
            muted
            loop
            playsInline
            controls
            poster="/images/biologyThumbnail.png"
            onMouseEnter={(e) => {
              e.target.currentTime = 0;
              e.target.play();
            }}
            onMouseLeave={(e) => e.target.pause()}
          />
        </div>
      </div>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${
                openIndex === index ? styles.open : ""
              }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.question}>
                {faq.question}
                <span className={styles.symbol}>
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              <div className={styles.answer}>{faq.answer}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
