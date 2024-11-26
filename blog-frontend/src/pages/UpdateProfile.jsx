// src/components/UpdateProfile.jsx
import React, { useState } from "react";

import "./UpdateProfile.css";
import { updateUser } from "../services/api";

const UpdateProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    try {
      //const response = await updateUser(id, credentials);
      const response = await updateUser(id, updateData);
      if (response.data.message) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (error) {
      setMessage("An error occurred while updating profile.");
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdateProfile} className="updateForm">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          id:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p className="update-message">{message}</p>}
    </div>
  );
};

export default UpdateProfile;
