import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SUBJECTS = ["maths", "biology", "english", "chemistry"];
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    grade: "",
    subjectWant: [],
    hoursPerDay: "",
    weekday: [],
    remember: false,
  });

  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const toggleSubject = (subject) => {
    setForm((prev) => ({
      ...prev,
      subjectWant: prev.subjectWant.includes(subject)
        ? prev.subjectWant.filter((s) => s !== subject)
        : [...prev.subjectWant, subject],
    }));
  };

  const toggleDay = (day) => {
    setForm((prev) => ({
      ...prev,
      weekday: prev.weekday.includes(day)
        ? prev.weekday.filter((d) => d !== day)
        : [...prev.weekday, day],
    }));
  };

  function validateForm() {
    if (!form.name.trim() || form.name.trim().split(" ").length < 2)
      return "Full name must contain at least first and father's name";

    if (!/^[^\s@]+@gmail\.com$/.test(form.email))
      return "Email must be a valid Gmail address";

    if (
      form.password.length < 6 ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(form.password)
    )
      return "Password must be at least 6 characters and contain a special character";

    if (!/^\d{10,15}$/.test(form.phone))
      return "Phone number must be 10–15 digits";

    if (!form.grade) return "Please select a grade";
    if (!form.hoursPerDay) return "Please select hours per day";
    if (form.subjectWant.length === 0)
      return "Please select at least one subject";
    if (form.weekday.length === 0)
      return "Please select at least one preferred day";

    return null;
  }

  async function submit(e) {
    e.preventDefault();
    setMsg("");

    const error = validateForm();
    if (error) {
      setMsg(error);
      return;
    }

    try {
      const response = await api.post("/auth/register", form);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.user || form)
        );

        setMsg("Registration successful! Redirecting to dashboard...");
        setTimeout(() => nav("/dashboard"), 1000);
      }
    } catch (err) {
      setMsg(
        err?.response?.data?.error || "Registration failed. Please try again."
      );
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Student Registration</h2>

      <form onSubmit={submit} className={styles.form}>
        <input
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={styles.input}
        />

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={styles.input}
        />

        <div className={styles.passwordWrapper}>
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={styles.input}
          />
          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <input
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={styles.input}
        />

        <select
          className={styles.input}
          value={form.grade}
          onChange={(e) => setForm({ ...form, grade: e.target.value })}
        >
          <option value="">Select Grade</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
            <option key={g} value={g}>
              Grade {g}
            </option>
          ))}
        </select>

        {/* Subjects */}
        <div>
          <strong>Subjects:</strong>
          {SUBJECTS.map((s) => (
            <label key={s} className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={form.subjectWant.includes(s)}
                onChange={() => toggleSubject(s)}
              />
              {s}
            </label>
          ))}
        </div>

        {/* Preferred Days */}
        <div>
          <strong>Preferred Days:</strong>
          {DAYS.map((d) => (
            <label key={d} className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={form.weekday.includes(d)}
                onChange={() => toggleDay(d)}
              />
              {d}
            </label>
          ))}
        </div>

        <select
          className={styles.input}
          value={form.hoursPerDay}
          onChange={(e) => setForm({ ...form, hoursPerDay: e.target.value })}
        >
          <option value="">Hours per day</option>
          <option value="1">1 hour</option>
          <option value="2">2 hours</option>
          <option value="3">3 hours</option>
        </select>

        <div className={styles.buttonGroup}>
          <button className={styles.button} type="submit">
            Register
          </button>
        </div>
      </form>

      {msg && (
        <div
          className={
            msg.toLowerCase().includes("successful")
              ? styles.success
              : styles.error
          }
        >
          {msg}
        </div>
      )}
    </div>
  );
}
