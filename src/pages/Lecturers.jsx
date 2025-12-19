import styles from "./Lecturers.module.css";
import lecturersData from "../data/lecturersData";
import { AiOutlinePhone, AiOutlineFilePdf } from "react-icons/ai";

export default function Lecturers({ subjects = [] }) {
  const filteredLecturers =
    subjects.length > 0
      ? lecturersData.filter((lec) =>
          lec.subjects.some((s) => subjects.includes(s.toLowerCase()))
        )
      : lecturersData;

  if (!filteredLecturers.length)
    return <p>No lecturers available for your selected subjects.</p>;

  return (
    <div className={styles.container}>
      {filteredLecturers.map((lec, i) => (
        <div key={i} className={styles.card}>
          <img src={lec.img} alt={lec.name} className={styles.profileImg} />
          <h2 className={styles.name}>{lec.name}</h2>
          <p className={styles.description}>{lec.description}</p>

          {/* Phone */}
          <p className={styles.phone}>
            <AiOutlinePhone style={{ marginRight: "5px" }} />
            <a href={`tel:${lec.phone}`} className={styles.phoneLink}>
              {lec.phone}
            </a>
          </p>

          {/* Downloadable PDF CV */}
          {lec.pdf && (
            <p className={styles.pdf}>
              <AiOutlineFilePdf style={{ marginRight: "5px" }} />
              <a href={lec.pdf} download className={styles.pdfLink}>
                Download CV
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
