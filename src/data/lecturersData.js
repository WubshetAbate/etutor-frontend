import Lecturer1 from "../../public/images/Lecturer1.jpeg";
import Lecturer2 from "../../public/images/Lecturer2.jpg";
import Lecturer3 from "../../public/images/Lecturer3.jpg";

const lecturers = [
  {
    name: "Mr Wubshet Abate",
    description:
      "English and Chemistry lecturer focused on helping students build strong foundational understanding.",
    subjects: ["english", "chemistry"],
    img: Lecturer1,
    phone: "0935585858", 
    pdf: "/pdf/Wubshet_Abate_CV.pdf", 
  },
  {
    name: "Mr Suleiman Mohammed",
    description: "Biology lecturer focused on helping students build strong foundational understanding.",
    subjects: ["biology"],
    img: Lecturer2,
    phone: "0907075597",
    pdf: "/pdf/Suleiman_Mohammed_CV.pdf",
  },
  {
    name: "Ms Iman Suleiman",
    description:
      "Mathematics lecturer focused on helping students build strong foundational understanding.",
    subjects: ["maths"],
    img: Lecturer3,
    phone: "0947670970",
    pdf: "/pdf/Iman_Suleiman_CV.pdf",
  },
];

export default lecturers;
