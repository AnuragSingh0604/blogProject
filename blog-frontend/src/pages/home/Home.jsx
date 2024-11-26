// src/components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Redirects to the login page
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Redirects to the registration page
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Blog App</h1>
      <p className="home-description">Please choose an option to continue.</p>
      <div className="home-buttons">
        <button onClick={handleLoginClick} className="home-button">
          Login
        </button>
        <button onClick={handleRegisterClick} className="home-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
