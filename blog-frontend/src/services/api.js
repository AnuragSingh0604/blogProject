import axios from "axios";

const API_URL = "http://localhost:3000"; // Replace with your backend URL

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication endpoints
export const registerUser = async (data) => {
  const response = await api.post("/users/register", data);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/users/login", credentials);
  console.log(response.data);
  return response.data; // Ensure response.data contains { message: "Login successful" }
};
// user module endpoints
export const getAllUser = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = () => api.delete("/users");

// Blog module endpoints
export const getBlogs = (username) => api.get(`/blogs/${username}`);
export const getBlogById = (id) => api.get(`/blogs/${id}`);
export const createBlog = (data) => api.post("/blogs", data);
export const updateBlog = (data) => api.put("/blogs", data);
export const deleteBlog = () => api.delete("/blogs");
export const fetchAllBlogs = () => api.get("/blogs");
export const likeBlog = async (credentials) => {
  const response = await api.post("/likes", credentials);
  return response.data; // Ensure response.data contains { message: "Login successful" }
};
export const dislikeBlog = async (credentials) => {
  const response = await api.delete("/likes", { data: credentials });
  return response.data; // Ensure response.data contains { message: "Login successful" }
};
export const likes = async (userId) => api.get(`/likes/${userId}`);

export const deleteBloglog = (userId, blogId) =>
  api.delete(`/blogs/${userId}/${blogId}`);

export const commentOnBlog = async (credentials) => {
  const response = await api.post("/comments", credentials);
  return response.data;
};
export const getcommnetById = (id) => api.get(`/comments/${id}`);

export default api;
