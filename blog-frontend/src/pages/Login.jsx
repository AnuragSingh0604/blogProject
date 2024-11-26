// src/components/Login.jsx
import React, { useState } from "react";
import { loginUser } from "../services/api";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    try {
      const response = await loginUser(credentials); // Call the API and get the response

      if (response.accessToken) {
        localStorage.setItem("token", response.accessToken);

        setSuccess(response.message);
        navigate("/dashboard");
      }

      // Set the success message in state
      // Optionally, handle token or redirection here if needed
    } catch (error) {
      setError(" Please give valid  credentials."); // Set error message
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      {error && (
        <p className={styles.message} style={{ color: "red" }}>
          {error}
        </p>
      )}{" "}
      {success && (
        <p className={styles.form} style={{ color: "red" }}>
          {success}
        </p>
      )}{" "}
      {/* Display message */}
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
