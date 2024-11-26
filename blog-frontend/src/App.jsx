import React from "react";
//import BlogList from "./components/BlogList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfile";
// import DeleteProfile from "./pages/DeleteProfile";
import CreateBlog from "./pages/CreateBlog";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        {/* <Route path="/delete-profile" element={<DeleteProfile />} /> */}
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
