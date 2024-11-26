// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBlogs,
  likes,
  dislikeBlog,
  likeBlog,
  getcommnetById,
  commentOnBlog,
  fetchAllBlogs,
} from "../services/api";

import { jwtDecode } from "jwt-decode";

import "./Dashboard.css";

const Dashboard = () => {
  const [username, setuserName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [expandedBlogId, setExpandedBlogId] = useState(null); // Track which blog is expanded

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const res = jwtDecode(token);
  const userId = res.id;
  const user = res.email;

  useEffect(() => {
    // Fetch blogs and liked blogs on component mount
    const fetchBlogs = async () => {
      const response = await fetchAllBlogs();

      setBlogs(response.data);
    };

    fetchBlogs();

    fetchLikedBlogs();
  }, []);

  const handleCreateBlog = () => {
    navigate("/Create-Blog");
  };

  const handleUpdateProfile = () => {
    navigate("/updateProfile");
  };

  const handleSearch = async () => {
    try {
      if (username !== "") {
        const response = await getBlogs(username);
        setBlogs([]);
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error("Error searching blogs:", error);
    }
  };
  const fetchLikedBlogs = async () => {
    try {
      const response = await likes(userId);

      const likedBlogIds = response.data.map((like) => like.blogId);

      setLikedBlogs(likedBlogIds);
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      console.error("Error fetching liked blogs:", error);
    }
  };

  const handleLike = async (blogId) => {
    try {
      if (likedBlogs.includes(blogId)) {
        // Unlike the blog

        const response = await dislikeBlog({ userId: userId, blogId: blogId });

        setLikedBlogs(likedBlogs.filter((id) => id !== blogId));
      } else {
        // Like the blog
        await likeBlog({ userId: userId, blogId: blogId });
        setLikedBlogs([...likedBlogs, blogId]);
      }
    } catch (error) {
      console.error(
        "Error liking/unliking blog:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleUpdateBlog = (blogId) => {
    navigate(`/update-blog/${blogId}`);
  };
  const openCommentPopup = async (blogId) => {
    setSelectedBlogId(blogId); // Set the currently selected blog ID
    try {
      const response = await getcommnetById(blogId); // Fetch comments for the blog
      setComments(response.data);
      if (isPopupOpen === blogId) {
        setIsPopupOpen(null);
      } else {
        setIsPopupOpen(blogId);
      }
      // Open the popup
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const handleCommentSubmit = async () => {
    try {
      if (!commentContent.trim()) {
        // If the comment content is empty, just close the popup
        setIsPopupOpen(null);
        return;
      }

      await commentOnBlog({
        content: commentContent,
        userId,
        blogId: selectedBlogId,
      });
      setCommentContent(""); // Clear the input field
      setSelectedBlogId(null);
      setIsPopupOpen(null);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };
  const toggleDetails = (blogId) => {
    if (selectedBlogId === blogId) {
      setSelectedBlogId(null); // Collapse if already expanded
    } else {
      setSelectedBlogId(blogId); // Expand the selected blog
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboardNavBar">
        <h1 className="dashboardTitle"> Welcome, {user}!</h1>
        <div className="navbarActions">
          <input
            type="text"
            placeholder="Search other users' blogs"
            value={username}
            onChange={(e) => setuserName(e.target.value)}
            className="dashboardInput"
          />
          <button className="dashboardButton" onClick={handleSearch}>
            Search
          </button>
          <button className="dashboardButton" onClick={handleCreateBlog}>
            Create New Blog
          </button>
          <button className="dashboardButton" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </div>
      </nav>
      {blogs.map((blog) => (
        <div className="blog-card" key={blog.id}>
          <div className="blog-header">
            <span className="author-name">Author : {blog.author.username}</span>
          </div>
          <h2 className="blog-title">{blog.title}</h2>
          <p className="blog-summary">
            {selectedBlogId === blog.id
              ? blog.content // Show full content if expanded
              : blog.content.length > 100
              ? `${blog.content.slice(0, 100)}...` // Show summary if not expanded
              : blog.content}
          </p>
          <div className="blog-actions">
            <button
              className={`like-button ${
                likedBlogs.includes(blog.id) ? "liked" : ""
              }`}
              onClick={() => handleLike(blog.id)}
              style={{ color: likedBlogs.includes(blog.id) ? "blue" : "red" }}
            >
              {likedBlogs.includes(blog.id) ? "unlike" : "Like"}
            </button>
            <button
              className="comment-button"
              onClick={() => openCommentPopup(blog.id)}
            >
              Comment
            </button>
            <button
              className="details-button"
              onClick={() => toggleDetails(blog.id)}
            >
              {selectedBlogId === blog.id ? "Show less" : "Show more"}
            </button>
          </div>
          {isPopupOpen === blog.id && (
            <div className="popup">
              <div className="popup-content">
                <h2>All Comments</h2>
                <ul>
                  {comments.map((comment) => (
                    <li key={comment.id}>
                      <strong>{comment.user?.username}</strong>:{" "}
                      {comment.content}
                    </li>
                  ))}
                </ul>
                <div className="commentDiv">
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Add your comment"
                  />
                  <button onClick={() => handleCommentSubmit()}>Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {searchResults.map((blog) => (
        <div key={blog.id} className="blog-card">
          <div className="blog-header">
            <span className="author-name">Author : {blog.author.username}</span>
          </div>
          <h3 blog-title>{blog.title}</h3>
          <p className="blog-summary">
            {selectedBlogId === blog.id
              ? blog.content // Show full content if expanded
              : blog.content.length > 100
              ? `${blog.content.slice(0, 100)}...` // Show summary if not expanded
              : blog.content}
          </p>

          <div className="blog-actions">
            <button
              className={`like-button ${
                likedBlogs.includes(blog.id) ? "liked" : ""
              }`}
              onClick={() => handleLike(blog.id)}
              style={{ color: likedBlogs.includes(blog.id) ? "blue" : "red" }}
            >
              {likedBlogs.includes(blog.id) ? "unlike" : "Like"}
            </button>

            <button
              className="comment-button"
              onClick={() => openCommentPopup(blog.id)}
            >
              Comment
            </button>
            <button
              className="details-button"
              onClick={() => toggleDetails(blog.id)}
            >
              {selectedBlogId === blog.id ? "Show less" : "Show more"}
            </button>
          </div>
          {isPopupOpen === blog.id && (
            <div className="popup">
              <div className="popup-content">
                <h2>All comments {blog.id}</h2>
                <ul>
                  {comments.map((comment) => (
                    <li key={comment.id}>
                      <strong>{comment.user?.username}</strong>:{" "}
                      {comment.content}
                    </li>
                  ))}
                </ul>
                <div className="commentDiv">
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Add your comment"
                  />
                  <button onClick={() => handleCommentSubmit()}>Submit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {message && <p className="dashboard-message">{message}</p>}
    </div>
  );
};

export default Dashboard;
