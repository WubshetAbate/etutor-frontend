import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberEmail") || "";
    const rememberedPassword = localStorage.getItem("rememberPassword") || "";
    if (rememberedEmail && rememberedPassword) {
      setForm({
        email: rememberedEmail,
        password: rememberedPassword,
        remember: true,
      });
    }
  }, []);

  function validateForm() {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(form.email))
      return "Email must be a valid Gmail address (example@gmail.com)";

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (form.password.length < 6 || !specialCharRegex.test(form.password))
      return "Password must be at least 6 characters and contain at least one special character";

    return null;
  }

  async function submit(e) {
    e.preventDefault();
    setMsg("");

    const validationError = validateForm();
    if (validationError) {
      setMsg(validationError);
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        if (form.remember) {
          localStorage.setItem("rememberEmail", form.email);
          localStorage.setItem("rememberPassword", form.password);
        } else {
          localStorage.removeItem("rememberEmail");
          localStorage.removeItem("rememberPassword");
        }

        const userResponse = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${response.data.token}` },
        });

        if (userResponse.data) {
          localStorage.setItem(
            "userInfo",
            JSON.stringify(userResponse.data.user || userResponse.data)
          );
        }

        setMsg("Login successful! Redirecting to Dashboard...");
        setTimeout(() => nav("/dashboard"), 1000);
      } else {
        setMsg("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setMsg(
        err?.response?.data?.error ||
          err?.response?.data?.details ||
          err?.message ||
          "Login failed. Please try again."
      );
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={submit} className={styles.form}>
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

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="remember"
            checked={form.remember}
            onChange={(e) => setForm({ ...form, remember: e.target.checked })}
          />
          <label htmlFor="remember">Remember Me</label>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.button} type="submit">
            Login
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
