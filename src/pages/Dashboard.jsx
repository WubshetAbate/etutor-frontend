import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Lecturers from "../pages/Lecturers";

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    grade: "",
    phone: "",
    courses: [],
    hoursPerDay: "",
    weekday: [],
  });

  const [activeTab, setActiveTab] = useState("profile");
  const nav = useNavigate();

useEffect(() => {
  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/login");
      return;
    }

    try {
      const response = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        const u = response.data.user || response.data;
        console.log("Fetched user courses:", u.courses);

        // Courses normalization (fixed to include all courses)
        let normalizedCourses = [];
        try {
          const fetchedCourses = Array.isArray(u.courses)
            ? u.courses
            : JSON.parse(u.courses || "[]");

          normalizedCourses = fetchedCourses.flatMap((c) => {
            if (typeof c === "string" && c.startsWith("[") && c.endsWith("]")) {
              const parsed = JSON.parse(c);
              return Array.isArray(parsed)
                ? parsed.map((item) => item.toLowerCase())
                : [parsed.toLowerCase()];
            }
            return [c.toLowerCase()];
          });
        } catch (err) {
          normalizedCourses = [];
        }

        setUser({
          name: u.name || "",
          email: u.email || "",
          grade: u.grade || "",
          phone: u.phone || "",
          courses: normalizedCourses,
          hoursPerDay: u.hoursPerDay || "",
          weekday: Array.isArray(u.weekday)
            ? u.weekday
            : u.weekday
            ? [u.weekday]
            : [],
        });
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      nav("/login");
    }
  }

  fetchUser();
}, [nav]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    nav("/login");
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.dashboardHeader}>
        <h1 className={styles.title}>Welcome, {user.name || "Student"}!</h1>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "profile" ? styles.activeTab : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={activeTab === "courses" ? styles.activeTab : ""}
          onClick={() => setActiveTab("courses")}
        >
          My Courses
        </button>
        <button
          className={activeTab === "schedule" ? styles.activeTab : ""}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule
        </button>
        <button
          className={activeTab === "lecturers" ? styles.activeTab : ""}
          onClick={() => setActiveTab("lecturers")}
        >
          Lecturers
        </button>
      </div>

      {/* Sections */}
      <div className={styles.section}>
        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className={styles.profile}>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Grade:</strong> {user.grade}
            </p>
          </div>
        )}

        {/* COURSES */}
        {activeTab === "courses" && (
          <div className={styles.courses}>
            <h3>Enrolled Courses:</h3>
            {user.courses.length > 0 ? (
              <ul>
                {user.courses.map((course, i) => (
                  <li key={i}>{course}</li>
                ))}
              </ul>
            ) : (
              <p>No courses selected yet.</p>
            )}
          </div>
        )}

        {/* SCHEDULE */}
        {activeTab === "schedule" && (
          <div className={styles.schedule}>
            <p>
              <strong>Preferred Days:</strong> {user.weekday.join(", ")}
            </p>
            <p>
              <strong>Hours per Day:</strong> {user.hoursPerDay}
            </p>
          </div>
        )}

        {/* LECTURERS */}
        {activeTab === "lecturers" && <Lecturers subjects={user.courses} />}
      </div>
    </div>
  );
}
