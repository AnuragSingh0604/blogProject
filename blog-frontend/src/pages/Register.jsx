// src/components/Register.jsx
import React, { useState } from "react";
import { registerUser } from "../services/api";

import styles from "./Login.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    try {
      const data = await registerUser(userData); // Call the registerUser function
      setSuccess(data.message); // Assuming your API returns a success message

      setError("");
    } catch (err) {
      setError("Registration failed");
      setSuccess("");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      {error && (
        <p className={styles.message} style={{ color: "red" }}>
          {error}
        </p>
      )}
      {success && <p style={{ color: "red" }}>{success}</p>}

      <form onSubmit={handleRegister} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
