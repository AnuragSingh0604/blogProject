import React, { useState } from "react";
import { createBlog } from "../services/api";
import "./CreateBlog.css"; // Import the CSS file
import { jwtDecode } from "jwt-decode";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  let authorId;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      authorId = decodedToken.id;
    } catch (error) {
      setErrorMessage("Token decode error:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !authorId) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await createBlog({ title, content, authorId });
      setSuccessMessage(response.data.message || "Blog created successfully!");
      setErrorMessage("");
      setTitle("");
      setContent("");
    } catch (error) {
      setErrorMessage("Failed to create blog. Please try again.");
      setSuccessMessage("");
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="create-blog-container">
      <h1>Create New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Blog Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Create Blog</button>
      </form>

      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default CreateBlog;
