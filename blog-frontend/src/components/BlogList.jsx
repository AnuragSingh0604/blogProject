// src/components/BlogList.js
import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/api";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]); // State for storing blogs
  const [error, setError] = useState(""); // State for handling errors

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogData = await getBlogs();
        setBlogs(blogData);
      } catch (err) {
        setError("Failed to load blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, []);

  // Display error message if fetching blogs failed
  if (error) {
    return <p>{error}</p>;
  }

  // Render the list of blogs
  return (
    <div>
      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog) => (
          <li
            key={blog.id}
            style={{ borderBottom: "1px solid #ccc", padding: "10px" }}
          >
            <h3>{blog.title}</h3>

            <p>by {blog.author} </p>
            <p>{blog.content.substring(0, 100)}...</p>
            {/* <button onClick={() => alert(`Navigate to blog ${blog.id}`)}>
              Read More
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
