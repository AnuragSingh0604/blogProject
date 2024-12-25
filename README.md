# blogProject

Here’s a well-structured and concise README file for your blog application:


A full-stack blog application built with React (frontend) and NestJS (backend). This application provides users with the ability to register, log in, create blogs, like/unlike posts, and comment on them, all secured by JWT-based authentication.

Features
User registration and login with JWT-based authentication.
Create, update, and delete blogs.
Like/unlike blogs and view real-time like counts.
Add and view comments on blogs.
Search blogs by username.
Protected routes to ensure secure access.
Tech Stack
Frontend
React: UI development.
Vite: Build tool for fast development.
Bun: Modern JavaScript runtime.
Backend
NestJS: Scalable and efficient server framework.
JWT: Authentication and route protection.
SQL: Database for managing users, blogs, likes, and comments.
Deployment
AWS EC2: Hosted the application on a Windows instance.
Installation
Prerequisites
Node.js, Bun, and NPM/Yarn installed.
SQL database setup.
AWS EC2 instance (if deploying).
Frontend Setup
bash
Copy code
cd frontend  
npm install  
npm run dev  
Backend Setup
bash
Copy code
cd backend  
npm install  
npm run start:dev  
Database Setup
Configure the database in the ormconfig or .env file.
Run migrations if applicable.
Usage
Register a new user via the registration page or API.
Log in to receive a JWT token.
Use the dashboard to create, update, and interact with blogs.
Search blogs by username and interact with them via likes and comments.
API Documentation
Authentication
POST /auth/register: Register a new user.
POST /auth/login: Login and receive a JWT token.
Blogs
GET /blogs: Fetch all blogs.
POST /blogs: Create a new blog.
PUT /blogs/:id: Update a specific blog.
DELETE /blogs/:id: Delete a blog.
Likes
POST /likes: Like a blog.
DELETE /likes: Unlike a blog.
Comments
POST /comments: Add a comment to a blog.
GET /comments/:id: Fetch comments for a blog.
Deployment on AWS EC2
Frontend:

Build the React application using npm run build.
Serve it using a static server or through Nginx (optional).
Backend:

Run the NestJS application using npm run start:prod.
Configure security groups to allow HTTP/HTTPS access.

Contribution
Feel free to fork this repository and create pull requests for improvements or additional features.
